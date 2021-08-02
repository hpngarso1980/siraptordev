<?php

namespace App\Services\SelfAssessment;

use Carbon\Carbon;
use App\Repositories\SelfAssessmentStreamRepository;
use App\Repositories\EpicRepository;
use App\Repositories\CustomFieldRepository;

class ProjectService
{
    protected $epicRepository;
    protected $streamRepository;
    protected $customFieldRepository;
    protected $types;
    protected $state;

    public function __construct(
        EpicRepository $epicRepository,
        SelfAssessmentStreamRepository $streamRepository,
        CustomFieldRepository $customFieldRepository
    )
    {
        $this->epicRepository = $epicRepository;
        $this->streamRepository = $streamRepository;
        $this->customFieldRepository = $customFieldRepository;
        $this->types = config('enums.task_types');
        $this->states = config('enums.task_states');
    }

    public function createProject($epicProperties = [], $streamIds = [])
    {
        $epicProperties = array_merge($epicProperties, [
            'state' => config('enums.task_states.todo'),
        ]);

        $epic = $this->epicRepository->create($epicProperties);
        $this->createTasks($epic->id, $streamIds);

        return $epic;
    }

    public function summarize($epicId)
    {
        $summary = $this->epicRepository->summarizeSelfAssessmentEpic($epicId);

        return $summary ? $this->generateSummary($summary) : [];
    }

    public function rankStream($epicId)
    {
        $scoreWeight = 57.5 / 100;
        $velocityWeight = 42.5 / 100;
        $summary = $this->epicRepository->summarizeSelfAssessmentEpic($epicId);
        $calculatedSummary = $summary ? $this->generateSummary($summary) : [];

        usort($calculatedSummary, function ($left, $right) use ($scoreWeight, $velocityWeight) {
            $leftRankScore = $scoreWeight * $left['final_score'] + $velocityWeight * $left['velocity_score'];
            $rightRankScore = $scoreWeight * $right['final_score'] + $velocityWeight * $right['velocity_score'];
            if ($rightRankScore > $leftRankScore) return 1;
            if ($rightRankScore < $leftRankScore) return -1;
            if ($right['title'] > $left['title']) return -1;
            if ($right['title'] < $left['title']) return 1;
            return 0;
        });

        return $calculatedSummary;
    }

    protected function createTasks($epicId, $streamdIds)
    {
        $streams = $this->streamRepository->model()->whereIn('id', $streamdIds)->get();
        $todoState = config('enums.task_states.todo');
        $subAreaCustomFieldIds = $this
            ->customFieldRepository
            ->model()
            ->select('id')
            ->whereIn('name', ['note', 'assessor_note', 'score'])
            ->get()
            ->map(function ($item) {
                return $item->id;
            });
        $weightFieldId = $this
            ->customFieldRepository
            ->model()
            ->select('id')
            ->where('name', 'weight')
            ->first()
            ->id;
        $scoreTargetFieldId = $this
            ->customFieldRepository
            ->model()
            ->select('id')
            ->where('name', 'score_target')
            ->first()
            ->id;

        foreach ($streams as $stream) {
            $streamTask = $stream->tasks()->create([
                'epic_id' => $epicId,
                'type' => $this->types['stream'],
                'title' => $stream->name,
                'state' => $todoState,
            ]);
            $streamTask->customFields()->sync([
                $scoreTargetFieldId => [
                    'value' => $stream->score_target,
                ],
            ]);

            foreach ($stream->areaGroups as $areaGroup) {
                $areaGroupTask = $areaGroup->tasks()->create([
                    'epic_id' => $epicId,
                    'type' => $this->types['area_group'],
                    'title' => $areaGroup->name,
                    'state' => $todoState,
                    'parent_id' => $streamTask->id,
                ]);
                $areaGroupTask->customFields()->sync([
                    $weightFieldId => [
                        'value' => $areaGroup->weight,
                    ],
                ]);

                foreach ($areaGroup->areas as $area) {
                    $areaTask = $area->tasks()->create([
                        'epic_id' => $epicId,
                        'type' => $this->types['area'],
                        'title' => $area->name,
                        'state' => $todoState,
                        'parent_id' => $areaGroupTask->id,
                    ]);
                    $areaTask->customFields()->sync([
                        $scoreTargetFieldId => [
                            'value' => $area->score_target,
                        ],
                    ]);

                    foreach ($area->subAreas as $subArea) {
                        $criteria = $subArea
                            ->criteria()
                            ->select(['score', 'level', 'description'])
                            ->get()
                            ->toJson();
                        $subAreaTask = $subArea->tasks()->create([
                            'epic_id' => $epicId,
                            'type' => $this->types['sub_area'],
                            'title' => $subArea->name,
                            'description' => $criteria,
                            'state' => $todoState,
                            'parent_id' => $areaTask->id,
                        ]);

                        $subAreaTask->customFields()->sync($subAreaCustomFieldIds->toArray());
                        $subAreaTask->customFields()->syncWithoutDetaching([
                            $weightFieldId => [
                                'value' => $subArea->weight,
                            ],
                            $scoreTargetFieldId => [
                                'value' => $subArea->score_target,
                            ],
                        ]);
                    }
                }
            }
        }
    }

    protected function generateSummary($summary)
    {
        $streamSummary = [];

        foreach ($summary as $taskSummary) {
            if ($taskSummary->type === $this->types['stream']) {
                array_push(
                    $streamSummary,
                    $this->generateSummaryData($taskSummary, $summary)
                );
            }
        }

        return $streamSummary;
    }

    protected function generateSummaryData($taskSummary, $summary)
    {
        $summaryData = $this->generateSummaryStructure($taskSummary);

        if ($taskSummary->type === $this->types['sub_area']) {
            $summaryData['final_score'] = $summaryData['weight'] && $summaryData['score']
                ? round($summaryData['weight'] * $summaryData['score'], 2)
                : 0;
            $summaryData['quantity_percentage'] = ($summaryData['quantity_achieved'] && $summaryData['quantity_achieved'] > 0) ? 100 : 0;
            return $summaryData;
        }

        if ($taskSummary->type === $this->types['area'] || $taskSummary->type === $this->types['stream']) {
            $summaryData['sub_tasks'] = $this->generateSubTasksSummaryData($taskSummary->id, $summary);
            $finalScore = round(array_reduce($summaryData['sub_tasks'], function($carry, $subTaskSummary) {
                return $carry + ($subTaskSummary['final_score'] ? $subTaskSummary['final_score'] : 0);
            }, 0), 2);
            $summaryData['score'] = $finalScore;
            $summaryData['final_score'] = $finalScore;
            $summaryData['state'] = $this->deriveStateFromSubTasks($summaryData['sub_tasks']);

            $quantityScore = $this->deriveQuantityScoreFromSubTasks($summaryData['sub_tasks']);
            $summaryData['quantity_achieved'] = $quantityScore['quantity_achieved'];
            $summaryData['quantity_target'] = $quantityScore['quantity_target'];
            $summaryData['quantity_percentage'] = ($quantityScore['quantity_achieved'] / $quantityScore['quantity_target']) * 100;
            return $summaryData;
        }

        if ($taskSummary->type === $this->types['area_group']) {
            $summaryData['sub_tasks'] = $this->generateSubTasksSummaryData($taskSummary->id, $summary);
            $subTasksFinalScore = array_reduce($summaryData['sub_tasks'], function($carry, $subTaskSummary) {
                return $carry + ($subTaskSummary['final_score'] ? $subTaskSummary['final_score'] : 0);
            }, 0);
            $summaryData['score'] = $subTasksFinalScore;
            $summaryData['final_score'] = round($summaryData['weight'] * $subTasksFinalScore, 2);
            $summaryData['state'] = $this->deriveStateFromSubTasks($summaryData['sub_tasks']);

            $quantityScore = $this->deriveQuantityScoreFromSubTasks($summaryData['sub_tasks']);
            $summaryData['quantity_achieved'] = $quantityScore['quantity_achieved'];
            $summaryData['quantity_target'] = $quantityScore['quantity_target'];
            $summaryData['quantity_percentage'] = ($quantityScore['quantity_achieved'] / $quantityScore['quantity_target']) * 100;
            return $summaryData;
        }

        return $summaryData;
    }

    protected function generateSubTasksSummaryData($parentId, $summary)
    {
        return $summary
            ->filter(function($subTaskSummary) use ($parentId) {
                return $subTaskSummary->parent_id === $parentId;
            })
            ->map(function($subTaskSummary) use ($summary) {
                return $this->generateSummaryData($subTaskSummary, $summary);
            })
            ->values()
            ->toArray();
    }

    protected function generateSummaryStructure($taskSummary)
    {
        $finishedDays = NULL;
        $periodDays = NULL;
        $velocityScore = 0;

        if ($taskSummary->start_date && $taskSummary->due_date) {
            $startDate = Carbon::parse($taskSummary->start_date);
            $dueDate = Carbon::parse($taskSummary->due_date);
            $periodDays = $dueDate->diffInDays($startDate) + 1;

            if ($taskSummary->finished_at) {
                $finishedAt = Carbon::parse($taskSummary->finished_at);
                $finishedDays = $finishedAt->diffInDays($startDate) + 1;
                $velocityScore = ($periodDays - $finishedDays) / $periodDays;
            }
        }

        return [
            'id' => $taskSummary->id,
            'type' => $taskSummary->type,
            'state' => $taskSummary->state,
            'title' => $taskSummary->title,
            'start_date' => $taskSummary->start_date,
            'due_date' => $taskSummary->due_date,
            'finished_at' => $taskSummary->finished_at,
            'finished_days' => $finishedDays,
            'period_days' => $periodDays,
            'weight' => $taskSummary->weight,
            'score' => $taskSummary->score,
            'final_score' => NULL,
            'velocity_score' => $velocityScore,
            'score_target' => $taskSummary->score_target,
            'quantity_achieved' => $taskSummary->attachment_count,
            'quantity_target' => NULL,
            'quantity_percentage' => NULL,
        ];
    }

    protected function deriveStateFromSubTasks($subTasks = [])
    {
        $subTaskStates = array_map(function($subTaskSummary) {
            return $subTaskSummary['state'];
        }, $subTasks);
        $isAllDone = array_reduce($subTaskStates, function($carry, $state) {
            return $carry && $state === $this->states['done'];
        }, TRUE);
        if ($isAllDone) return $this->states['done'];

        $isAnyInProgress = array_reduce($subTaskStates, function($carry, $state) {
            return $carry || $state !== $this->states['todo'];
        }, FALSE);
        if ($isAnyInProgress) return $this->states['in_progress'];

        return $this->states['todo'];
    }

    protected function deriveQuantityScoreFromSubTasks($subTasks = [])
    {
        return [
            'quantity_achieved' => array_reduce($subTasks, function($carry, $subTaskSummary) {
                return $carry + (($subTaskSummary['quantity_achieved'] && $subTaskSummary['quantity_achieved'] > 0) ? 1 : 0);
            }, 0),
            'quantity_target' => count($subTasks),
        ];
    }
}
