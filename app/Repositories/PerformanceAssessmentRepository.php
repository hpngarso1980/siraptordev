<?php

namespace App\Repositories;

use Illuminate\Support\Arr;

use App\Repositories\BaseRepository;
use App\Models\PerformanceAssessment;
use App\Models\PerformanceIndicator;
use App\Models\PerformanceIndicatorGroup;
use App\Models\PerformanceTemplate;

const PERFORMANCE = 'performance';
const DEDUCTION = 'deduction';
const FINAL_CALCULATION = 'final';

class PerformanceAssessmentRepository extends BaseRepository
{
    protected $performanceTemplate;
    protected $performanceIndicator;

    public function __construct(
        PerformanceAssessment $performanceAssessment,
        PerformanceTemplate $performanceTemplate,
        PerformanceIndicator $performanceIndicator
    )
    {
        $this->model = $performanceAssessment;
        $this->performanceTemplate = $performanceTemplate;
        $this->performanceIndicator = $performanceIndicator;
    }

    public function findSummaries($templateId, $month, $cumulative = TRUE)
    {
        $assessments = $this->findAllByPeriod($templateId, $month, [
            'cumulative' => $cumulative,
        ]);
        $summaries = $this->generateSummaries($assessments);

        return $summaries;
    }

    public function findDetailByIndicatorGroup($indicatorGroupId, $options = [])
    {
        $templateId = Arr::get($options, 'templateId', NULL);
        $month = Arr::get($options, 'month', NULL);
        $options = [
            'performance_indicator_group_id' => $indicatorGroupId,
            'cumulative' => Arr::get($options, 'cumulative', FALSE),
            'with_children' => TRUE,
        ];

        $assessments = $this->findAllByPeriod($templateId, $month, $options);

        return $assessments;
    }

    public function findDetailByIndicator($indicatorId, $options = [])
    {
        $templateId = Arr::get($options, 'templateId', NULL);
        $month = Arr::get($options, 'month', NULL);
        $options = [
            'indicator_id' => $indicatorId,
            'cumulative' => Arr::get($options, 'cumulative', FALSE),
            'with_previous_months' => TRUE,
        ];

        $assessments = $this->findAllByPeriod($templateId, $month, $options);

        return $assessments;
    }

    public function updateByMonth($properties)
    {
        $indicatorId = $properties['performance_indicator_id'];
        $month = $properties['month'];
        $type = $properties['type'];
        $indicator = $this->performanceIndicator
            ->with(['indicatorGroup'])
            ->find($indicatorId);
        $updatedProperties = $indicator->indicatorGroup->deduction
            ? $properties
            : $this->calculateProperties($indicator, $properties);

        $result = $this->model->updateOrCreate(
            [
                'type' => $type,
                'performance_indicator_id' => $indicatorId,
                'month' => $month,
            ],
            $updatedProperties
        );

        $this->recalculateParents($indicator, $month, $type);

        return $result;
    }

    private function findAllByPeriod($templateId, $month, $options = [])
    {
        $cumulative = Arr::get($options, 'cumulative', FALSE);
        $performanceIndicatorGroupId = Arr::get($options, 'performance_indicator_group_id', NULL);
        $indicatorId = Arr::get($options, 'indicator_id', NULL);
        $withPreviousMonths = Arr::get($options, 'with_previous_months', FALSE);
        $withChildren = Arr::get($options, 'with_children', FALSE);

        $template = $this->performanceTemplate->find($templateId);

        if (!$template) return [];

        $month = $month ? $month : 12;
        $indicatorProperties = [
            'id',
            'performance_indicator_group_id',
            'parent_id',
            'code',
            'indicator',
            'unit',
            'weight',
        ];
        $assessmentProperties = [
            'id',
            'performance_indicator_id',
            'month',
            'target',
            'realization',
            'accomplishment_percentage',
            'score',
            'note',
            'priority',
        ];

        $assessmentQuery = function ($query) use ($month, $cumulative, $assessmentProperties, $withPreviousMonths) {
            $type = $cumulative
                ? config('enums.performance_assessment_types.cumulative')
                : config('enums.performance_assessment_types.monthly');
            $query
                ->select($assessmentProperties)
                ->where('month', $withPreviousMonths ? '<=' : '=', $month)
                ->where('type', '=', $type);
        };
        $childrenQuery = function ($query) use ($assessmentQuery, $indicatorProperties) {
            $query
                ->select($indicatorProperties)
                ->with([
                    'assessments' => $assessmentQuery,
                ]);
        };

        $baseQuery = $template->indicators()->select($indicatorProperties);
        $relations = ['assessments' => $assessmentQuery];

        if ($indicatorId) {
            $baseQuery->where('id', '=', $indicatorId);
        }

        if ($performanceIndicatorGroupId) {
            $baseQuery
                ->whereNull('parent_id')
                ->where('performance_indicator_group_id', $performanceIndicatorGroupId);
        }

        if ($withChildren) {
            $relations['children'] = function ($query) use ($childrenQuery, $assessmentQuery, $indicatorProperties) {
                $query
                    ->select($indicatorProperties)
                    ->with([
                        'children' => $childrenQuery,
                        'assessments' => $assessmentQuery,
                    ]);
            };
        }

        $assessments = $baseQuery
            ->with($relations)
            ->get();

        return $assessments;
    }

    private function generateSummaries($assessments)
    {
        $indicatorGroups = PerformanceIndicatorGroup::all();

        $summaries = $this->populateSummaries($indicatorGroups, $assessments);
        $summaries = $this->formatSummaries($summaries);
        $summaries = $this->calculateFinalScore($summaries);

        return $summaries;
    }

    private function populateSummaries($indicatorGroups, $assessments)
    {
        $summaries = $this->generateEmptySummaries($indicatorGroups);

        foreach ($assessments as $indicator) {
            $indicatorGroupId = $indicator->performance_indicator_group_id;
            $weight = $indicator->weight;

            $averageScore = $this->averageScore($indicator->assessments);

            $summaries[$indicatorGroupId]['weight'] += $weight;
            $summaries[$indicatorGroupId]['score'] += $averageScore;
            $summaries[$indicatorGroupId]['accomplishment_percentage'] = $summaries[$indicatorGroupId]['weight'] != 0
                ? $summaries[$indicatorGroupId]['score'] / $summaries[$indicatorGroupId]['weight'] * 100
                : 0;
        }

        return $summaries;
    }

    private function generateEmptySummaries($indicatorGroups)
    {
        $summaries = [];

        foreach ($indicatorGroups as $group) {
            $groupId = $group->id;
            $groupTitle = $group->title;
            $groupSlug = $group->slug;
            $groupType = $group->deduction ? DEDUCTION : PERFORMANCE;

            if (!array_key_exists($groupSlug, $summaries)) {
                $summaries[$groupId] = [
                    'performance_indicator_group_id' => $groupId,
                    'slug' => $groupSlug,
                    'title' => $groupTitle,
                    'type' => $groupType,
                    'weight' => 0,
                    'score' => 0,
                    'accomplishment_percentage' => 0,
                ];
            }
        }

        return $summaries;
    }

    private function formatSummaries($summaries)
    {
        foreach ($summaries as $key => $item) {
            $summaries[$key]['score'] = round($summaries[$key]['score'], 2);

            if ($summaries[$key]['type'] === PERFORMANCE) {
                $summaries[$key]['accomplishment_percentage'] = round($summaries[$key]['accomplishment_percentage'], 2);
            } else {
                unset($summaries[$key]['accomplishment_percentage']);
            }
        }

        return $summaries;
    }

    private function calculateFinalScore($summaries)
    {
        $finalScore = [
            'slug' => 'final-score',
            'title' => 'NKO',
            'type' => FINAL_CALCULATION,
            'score' => 0,
        ];

        foreach ($summaries as $key => $item) {
            if ($summaries[$key]['type'] === PERFORMANCE) {
                $finalScore['score'] += $summaries[$key]['score'];
            } else if ($summaries[$key]['type'] === DEDUCTION){
                $finalScore['score'] -= $summaries[$key]['score'];
            }
        }

        $finalScore['score'] = round($finalScore['score'], 2);

        array_push($summaries, $finalScore);

        return $summaries;
    }

    private function averageScore($assessments)
    {
        $assessmentsCount = count($assessments);
        $totalScore = 0;

        foreach ($assessments as $assessment) {
            $totalScore += $assessment->score;
        }

        $averageScore = $assessmentsCount !== 0
            ? $totalScore / $assessmentsCount
            : 0;

        return $averageScore;
    }

    private function recalculateParents($indicator, $month, $type)
    {
        if (!$indicator) return;

        $parentIndicator = $indicator->parent;

        if (!$parentIndicator) return;

        $updatedParentProperties = $this->recalculateParentProperties($parentIndicator, $month, $type);
        $updatedParentAssessment = [
            'type' => $type,
            'performance_indicator_id' => $parentIndicator->id,
            'month' => $month,
        ];

        $this->model->updateOrCreate(
            $updatedParentAssessment,
            $updatedParentProperties
        );

        if ($parentIndicator->parent_id) {
            $this->recalculateParents($parentIndicator, $month, $type);
        }
    }

    private function calculateProperties($indicator, $properties)
    {
        $weight = $indicator->weight;

        $accomplishmentPercentage = $properties['target'] > 0
            ? $properties['realization'] / $properties['target'] * 100
            : 0;
        $score = $accomplishmentPercentage > 100 ? $weight : $weight * $accomplishmentPercentage / 100;

        $properties['score'] = round($score, 2);
        $properties['accomplishment_percentage'] = round($accomplishmentPercentage, 2);

        return $properties;
    }

    private function recalculateParentProperties($parentIndicator, $month, $type)
    {
        $childIndicatorIds = Arr::pluck($parentIndicator->children()->select('id')->get(), 'id');
        $childAssessments = $this->model
            ->whereIn('performance_indicator_id', $childIndicatorIds)
            ->where([
                'month' => $month,
                'type' => $type,
            ])
            ->get();

        $accomplishmentPercentage = 0;
        $score = 0;

        $properties = [
            'accomplishment_percentage' => 0,
            'score' => 0,
        ];

        $properties = $childAssessments->reduce(function ($carry, $assessment) {
            return [
                'score' => $carry['score'] + $assessment->score,
            ];
        }, $properties);

        $accomplishmentPercentage = $parentIndicator->weight > 0
            ? $properties['score'] / $parentIndicator->weight * 100
            : 0;
        $properties['accomplishment_percentage'] = round($accomplishmentPercentage, 2);

        return array_merge($properties, [
            'target' => NULL,
            'realization' => NULL,
        ]);
    }
}
