<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use App\Models\SelfAssessmentStream;
use App\Services\SelfAssessment\ProjectService;

class TestSelfAssessmentProjectsSeeder extends Seeder
{
    protected $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $streamIds = SelfAssessmentStream::select('id')->get()->map(function($stream) {
            return $stream->id;
        });
        $epics = [
            [
                'title' => 'Self Assessment Project Sample 1',
                'start_date' => Carbon::now()->format('Y-m-d'),
                'end_date' => Carbon::now()->addDays(20)->format('Y-m-d'),
            ],
            [
                'title' => 'Project 1',
                'start_date' => Carbon::now()->subDays(15)->format('Y-m-d'),
                'end_date' => Carbon::now()->addDays(5)->format('Y-m-d'),
            ],
            [
                'title' => 'Self Assessment Project Sample 2',
                'start_date' => Carbon::now()->subDays(15)->format('Y-m-d'),
                'end_date' => Carbon::now()->format('Y-m-d'),
            ],
        ];

        foreach ($epics as $epic) {
            $this->projectService->createProject($epic, $streamIds);
        }

        // for ($i = 0; $i < 5000; $i++) {
        //     $this->projectService->createProject([
        //         'title' => "Test Epic $i",
        //         'start_date' => Carbon::now()->subDays(15)->format('Y-m-d'),
        //         'end_date' => Carbon::now()->addDays(5)->format('Y-m-d'),
        //     ], $streamIds);
        // }
    }
}
