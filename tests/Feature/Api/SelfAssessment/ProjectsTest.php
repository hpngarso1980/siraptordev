<?php

namespace Tests\Feature\Api\SelfAssessment;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\CustomField;
use App\Models\Epic;
use App\Models\SelfAssessmentStream;
use App\Models\SelfAssessmentArea;
use App\Models\SelfAssessmentAreaGroup;
use App\Models\SelfAssessmentSubArea;
use App\Models\SelfAssessmentCriterion;
use App\Models\Task;
use Tests\TestCase;
use Tests\ApiHelpers;
use CustomFieldsTableSeeder;

class ProjectsTest extends TestCase
{
    use RefreshDatabase, ApiHelpers;

    protected $baseUrl = '/api/self-assessment/projects';
    protected $epicStructure = [
        'id',
        'title',
        'start_date',
        'end_date',
        'state',
        'created_at',
        'updated_at',
        'finished_at',
    ];
    protected $summaryStructure = [
        'id',
        'type',
        'state',
        'title',
        'due_date',
        'finished_at',
        'weight',
        'score',
        'final_score',
        'score_target',
        'quantity_achieved',
        'quantity_target',
        'quantity_percentage',
    ];

    public function setUp(): void
    {
        parent::setUp();

        $this->seed(CustomFieldsTableSeeder::class);
    }

    public function testCreateProject()
    {
        // $this->markTestSkipped('flaky');

        $streams = $this->prepareSelfAssesmentData();
        $streamIds = $streams->map(function($stream) {
            return $stream->id;
        })->toArray();
        $requestBody = [
            'title' => 'Any string',
            'stream_ids' => $streamIds,
            'start_date' => '2020-01-01',
            'end_date' => '2020-02-01',
        ];
        $response = $this->apiRequest('POST', $this->baseUrl, $requestBody);

        $response
            ->assertStatus(201)
            ->assertJsonStructure([
                'data' => $this->epicStructure,
            ])
            ->assertJson([
                'data' => [
                    'title' => $requestBody['title'],
                    'start_date' => $requestBody['start_date'],
                    'end_date' => $requestBody['end_date'],
                ],
            ]);

        $this->assertDatabaseHas('epics', [
            'title' => $requestBody['title'],
            'state' => 1,
        ]);

        $savedEpic = Epic::where('title', $requestBody['title'])->first();
        $taskCount = Task::count();
        $expectedTaskCount = SelfAssessmentStream::count() + SelfAssessmentAreaGroup::count() + SelfAssessmentArea::count() + SelfAssessmentSubArea::count();

        $this->assertEquals($expectedTaskCount, $taskCount);

        foreach ($streams as $stream) {
            $this->assertDatabaseHas('tasks', [
                'epic_id' => $savedEpic->id,
                'title' => $stream->name,
                'type' => 1,
                'state' => 1,
                'taskable_id' => $stream->id,
                'taskable_type' => 'App\Models\SelfAssessmentStream',
            ]);
            $streamTask = Task::where([
                'epic_id' => $savedEpic->id,
                'title' => $stream->name,
                'taskable_id' => $stream->id,
            ])->first();

            foreach ($stream->areaGroups as $areaGroup) {
                $this->assertDatabaseHas('tasks', [
                    'epic_id' => $savedEpic->id,
                    'title' => $areaGroup->name,
                    'type' => 2,
                    'state' => 1,
                    'parent_id' => $streamTask->id,
                    'taskable_id' => $areaGroup->id,
                    'taskable_type' => 'App\Models\SelfAssessmentAreaGroup',
                ]);
                $areaGroupTask = Task::where([
                    'epic_id' => $savedEpic->id,
                    'title' => $areaGroup->name,
                    'taskable_id' => $areaGroup->id,
                ])->first();

                foreach ($areaGroup->areas as $area) {
                    $this->assertDatabaseHas('tasks', [
                        'epic_id' => $savedEpic->id,
                        'title' => $area->name,
                        'type' => 3,
                        'state' => 1,
                        'parent_id' => $areaGroupTask->id,
                        'taskable_id' => $area->id,
                        'taskable_type' => 'App\Models\SelfAssessmentArea',
                    ]);
                    $areaTask = Task::where([
                        'epic_id' => $savedEpic->id,
                        'title' => $area->name,
                        'taskable_id' => $area->id,
                    ])->first();

                    foreach ($area->subAreas as $subArea) {
                        $this->assertDatabaseHas('tasks', [
                            'epic_id' => $savedEpic->id,
                            'title' => $subArea->name,
                            'type' => 4,
                            'state' => 1,
                            'parent_id' => $areaTask->id,
                            'taskable_id' => $subArea->id,
                            'taskable_type' => 'App\Models\SelfAssessmentSubArea',
                        ]);
                    }
                }
            }
        }
    }

    public function testGetTasksAfterCreateProject()
    {
        // $this->markTestSkipped('flaky');

        $epicId = $this->prepareProject();
        $taskResponse = $this->apiRequest('GET', "/api/tasks?epic_id=$epicId&with_sub_tasks=true");

        $taskResponse
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    [
                        'custom_fields' => NULL,
                        'sub_tasks' => [
                            [
                                'custom_fields' => [
                                    'weight' => [
                                        'value' => '0.5',
                                    ],
                                ],
                                'sub_tasks' => [
                                    [
                                        'sub_tasks' => [
                                            [
                                                'custom_fields' => [
                                                    'weight' => [
                                                        'value' => '0.5',
                                                    ],
                                                ]
                                            ]
                                        ],
                                        'custom_fields' => NULL,
                                    ],
                                ],
                            ]
                        ]
                    ],
                ],
            ]);
    }

    public function testGetProjectSummary()
    {
        // $this->markTestSkipped('flaky');

        $epicId = $this->prepareProject();
        $weightFieldId = CustomField::where('name', 'weight')
            ->select('id')
            ->first()
            ->id;
        $scoreFieldId = CustomField::where('name', 'score')
            ->select('id')
            ->first()
            ->id;
        $sampleWeight = 0.5;
        $sampleScore = 1;

        // set sample score and weight
        foreach(config('enums.task_types') as $enum => $type) {
            Task::where([
                'epic_id' => $epicId,
                'type' => $type,
            ])
            ->get()
            ->each(function($task) use ($enum, $scoreFieldId, $weightFieldId, $sampleScore, $sampleWeight) {
                if ($enum === 'sub_area' || $enum === 'area_group') {
                    $task->customFields()->syncWithoutDetaching([
                        $weightFieldId => [
                            'value' => $sampleWeight,
                        ],
                    ]);
                }

                if ($enum === 'sub_area') {
                    $task->update([
                        'state' => config('enums.task_states.in_progress'),
                    ]);
                    $task->attachments()->create([
                        'path' => '/dummy/file.pdf',
                    ]);
                }

                $task->customFields()->syncWithoutDetaching([
                    $scoreFieldId => [
                        'value' => $sampleScore,
                    ],
                ]);
            });
        }


        $url = "$this->baseUrl/summary?epic_id=$epicId";
        $response = $this->apiRequest('GET', $url);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->summaryStructure,
                ],
            ])
            ->assertJson([
                'data' => [
                    [
                        'final_score' => 2,
                        'state' => config('enums.task_states.in_progress'),
                        'quantity_achieved' => 2,
                        'quantity_target' => 2,
                        'quantity_percentage' => 100,
                        'sub_tasks' => [
                            [
                                'final_score' => 1,
                                'state' => config('enums.task_states.in_progress'),
                                'quantity_achieved' => 2,
                                'quantity_target' => 2,
                                'quantity_percentage' => 100,
                                'sub_tasks' => [
                                    [
                                        'final_score' => 1,
                                        'state' => config('enums.task_states.in_progress'),
                                        'quantity_achieved' => 2,
                                        'quantity_target' => 2,
                                        'quantity_percentage' => 100,
                                        'sub_tasks' => [
                                            [
                                                'final_score' => 0.5,
                                                'quantity_achieved' => 1,
                                                'quantity_target' => NULL,
                                                'quantity_percentage' => 100,
                                            ]
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ],
            ]);
    }

    private function prepareProject()
    {
        $streams = $this->prepareSelfAssesmentData();
        $streamIds = $streams->map(function($stream) {
            return $stream->id;
        })->toArray();
        $requestBody = [
            'title' => 'Any string',
            'stream_ids' => $streamIds,
            'start_date' => '2020-01-01',
            'end_date' => '2020-02-01',
        ];
        $epicResponse = $this->apiRequest('POST', $this->baseUrl, $requestBody);
        $epicId = $epicResponse['data']['id'];

        return $epicId;
    }

    private function prepareSelfAssesmentData()
    {
        $streams = factory(SelfAssessmentStream::class, 2)->create();

        foreach ($streams as $stream) {
            $areaGroups = factory(SelfAssessmentAreaGroup::class, 2)->create([
                'self_assessment_stream_id' => $stream->id,
                'weight' => 0.5,
            ]);

            foreach ($areaGroups as $areaGroup) {
                $areas = factory(SelfAssessmentArea::class, 2)->create([
                    'self_assessment_area_group_id' => $areaGroup->id,
                ]);

                foreach ($areas as $area) {
                    $subAreas = factory(SelfAssessmentSubArea::class, 2)->create([
                        'self_assessment_area_id' => $area->id,
                    ]);

                    foreach ($subAreas as $subArea) {
                        factory(SelfAssessmentCriterion::class, 2)->create([
                            'self_assessment_sub_area_id' => $subArea->id,
                        ]);
                    }
                }
            }
        }

        return $streams;
    }
}
