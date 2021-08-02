<?php

namespace App\Http\Controllers\Api\PerformanceMonitoring;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\PerformanceAssessmentRepository;

class AssessmentsController extends Controller
{
    protected $performanceAssessment;
    protected $properties;

    public function __construct(PerformanceAssessmentRepository $performanceAssessment)
    {
        $this->performanceAssessment = $performanceAssessment;
        $this->properties = [
            'type' => 'required',
            'performance_indicator_id' => 'required',
            'month' => 'nullable',
            'target' => 'nullable',
            'realization' => 'nullable',
            'note' => 'nullable',
            'priority' => 'nullable|numeric',
            'score' => 'nullable|numeric',
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $performanceIndicatorGroupId = request()->query('group_id');
        $performanceIndicatorId = request()->query('indicator_id');
        $templateId = request()->query('template_id');
        $month = request()->query('month');
        $cumulative = strtolower(request()->query('cumulative')) === 'true';

        $options = [
            'templateId' => $templateId,
            'month' => $month,
            'cumulative' => $cumulative,
        ];
        $assessments = $performanceIndicatorId
            ? $this->performanceAssessment->findDetailByIndicator($performanceIndicatorId, $options)
            : $this->performanceAssessment->findDetailByIndicatorGroup($performanceIndicatorGroupId, $options);

        return $this->respondWithSuccess($assessments);
    }

    /**
     * Display summaries.
     *
     * @return \Illuminate\Http\Response
     */
    public function summaries()
    {
        $templateId = request()->query('template_id');
        $month = request()->query('month');
        $cumulative = strtolower(request()->query('cumulative')) === 'true';

        $summaries = $this->performanceAssessment->findSummaries($templateId, $month, $cumulative);

        return $this->respondWithSuccess($summaries);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->validateThenProceed(function () {
            $result = $this->performanceAssessment->updateByMonth(
                request()->only(array_keys($this->properties))
            );

            return $this->respondWithCreated($result);
        }, $this->properties);
    }
}
