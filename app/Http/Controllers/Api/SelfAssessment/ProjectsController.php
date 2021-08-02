<?php

namespace App\Http\Controllers\Api\SelfAssessment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\SelfAssessment\ProjectService;
use App\Http\Resources\Epic as EpicResource;

class ProjectsController extends Controller
{
    protected $projectService;
    protected $epicProperties;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
        $this->epicProperties = [
            'title' => 'required',
            'start_date' => 'nullable|date_format:Y-m-d',
            'end_date' => 'nullable|date_format:Y-m-d',
        ];
    }

    public function store(Request $request)
    {
        $properties = array_merge($this->epicProperties, [
            'stream_ids' => 'required',
        ]);

        return $this->validateThenProceed(function () {
            $epicInput = request()->only(array_keys($this->epicProperties));

            $epic = $this->projectService->createProject($epicInput, request()->stream_ids);

            return $this->respondWithCreated(new EpicResource($epic));
        }, $properties);
    }

    public function summary()
    {
        $epicId = request()->query('epic_id', NULL);

        if (!$epicId) return $this->respondWithNotFound();

        $summary = $this->projectService->summarize($epicId);

        return $this->respondWithSuccess($summary);
    }

    public function streamRank()
    {
        $epicId = request()->query('epic_id', NULL);

        if (!$epicId) return $this->respondWithNotFound();

        $rank = $this->projectService->rankStream($epicId);

        return $this->respondWithSuccess($rank);
    }
}
