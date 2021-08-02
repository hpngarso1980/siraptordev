<?php

namespace Tests\Feature\Api\SelfAssessment;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\ActionPlanCategory;
use App\Models\Epic;
use App\Models\SelfAssessmentActionPlan;
use App\Models\SelfAssessmentStream;
use App\Models\SelfAssessmentArea;
use App\Models\SelfAssessmentAreaGroup;
use App\Models\SelfAssessmentSubArea;
use App\Models\User;
use Tests\TestCase;
use Tests\ApiUrls;
use Tests\ApiHelpers;

class ActionPlansTest extends TestCase
{
    use RefreshDatabase, ApiUrls, ApiHelpers;

    protected $baseUrl = '/api/self-assessment/action-plans';
    protected $actionPlanStructure = [
        'id',
        'description',
        'due_date',
        'note',
        'status',
        'created_at',
        'updated_at',
        'epic',
        'category',
        'streams' => [
            '*' => [
                'id',
                'name',
            ],
        ],
        'areas' => [
            '*' => [
                'id',
                'name',
            ],
        ],
        'sub_areas' => [
            '*' => [
                'id',
                'name',
            ],
        ],
        'assignees' => [
            '*' => [
                'id',
                'name',
            ],
        ],
    ];
    protected $historyStructure = [
        'id',
        'user' => [
            'id',
            'name',
            'photo',
        ],
        'change_type',
        'change_type_displayed',
        'field_name',
        'from',
        'to',
        'created_at',
    ];

    public function testGetActionPlans()
    {
        $actionPlan = factory(SelfAssessmentActionPlan::class)->create();
        $response = $this->apiRequest('GET', $this->baseUrl);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->actionPlanStructure,
                ],
            ]);
    }

    public function testCreateActionPlan()
    {
        $user = factory(User::class)->create();
        $epic = factory(Epic::class)->create();
        $actionPlan = [
            'description' => 'Action plan',
            'due_date' => '2020-01-01',
            'note' => 'Sample note',
            'status' => 1,
            'assignees' => [$user->id],
            'epic_id' => $epic->id,
        ];
        $response = $this->apiRequest('POST', $this->baseUrl, $actionPlan);

        $response
            ->assertStatus(201)
            ->assertJsonStructure([
                'data' => $this->actionPlanStructure,
            ])
            ->assertJson([
                'data' => [
                    'description' => $actionPlan['description'],
                    'due_date' => $actionPlan['due_date'],
                    'note' => $actionPlan['note'],
                    'status' => $actionPlan['status'],
                    'epic' => [
                        'id' => $epic->id,
                    ],
                    'assignees' => [
                        [
                            'id' => $user->id,
                        ],
                    ],
                ],
            ]);
    }

    public function testCreateActionPlanWithCategory()
    {
        $user = factory(User::class)->create();
        $category = factory(ActionPlanCategory::class)->create();
        $actionPlan = [
            'description' => 'Action plan',
            'due_date' => '2020-01-01',
            'note' => 'Sample note',
            'status' => 1,
            'assignees' => [$user->id],
            'action_plan_category_id' => $category->id,
        ];
        $response = $this->apiRequest('POST', $this->baseUrl, $actionPlan);

        $response
            ->assertStatus(201)
            ->assertJsonStructure([
                'data' => $this->actionPlanStructure,
            ])
            ->assertJson([
                'data' => [
                    'description' => $actionPlan['description'],
                    'due_date' => $actionPlan['due_date'],
                    'note' => $actionPlan['note'],
                    'status' => $actionPlan['status'],
                    'category' => [
                        'id' => $category->id,
                    ],
                    'assignees' => [
                        [
                            'id' => $user->id,
                        ],
                    ],
                ],
            ]);
    }

    public function testCreateActionPlanWithStream()
    {
        $user = factory(User::class)->create();
        $stream1 = factory(SelfAssessmentStream::class)->create();
        $stream2 = factory(SelfAssessmentStream::class)->create();
        $actionPlan = [
            'description' => 'Action plan',
            'due_date' => '2020-01-01',
            'note' => 'Sample note',
            'status' => 1,
            'streams' => [$stream1->id, $stream2->id],
            'assignees' => [$user->id],
        ];
        $response = $this->apiRequest('POST', $this->baseUrl, $actionPlan);

        $response
            ->assertStatus(201)
            ->assertJsonStructure([
                'data' => $this->actionPlanStructure,
            ])
            ->assertJson([
                'data' => [
                    'description' => $actionPlan['description'],
                    'due_date' => $actionPlan['due_date'],
                    'note' => $actionPlan['note'],
                    'status' => $actionPlan['status'],
                    'streams' =>[
                        [
                            'id' => $stream1->id,
                        ],
                        [
                            'id' => $stream2->id,
                        ],
                    ],
                ],
            ]);
    }

    public function testCreateActionPlanWithArea()
    {
        $user = factory(User::class)->create();
        $stream = factory(SelfAssessmentStream::class)->create();
        $areaGroup = factory(SelfAssessmentAreaGroup::class)->create([
            'self_assessment_stream_id' => $stream->id,
        ]);
        $area1 = factory(SelfAssessmentArea::class)->create([
            'self_assessment_area_group_id' => $areaGroup->id,
        ]);
        $area2 = factory(SelfAssessmentArea::class)->create([
            'self_assessment_area_group_id' => $areaGroup->id,
        ]);
        $actionPlan = [
            'description' => 'Action plan',
            'due_date' => '2020-01-01',
            'note' => 'Sample note',
            'status' => 1,
            'streams' => "$stream->id",
            'areas' => [$area1->id, $area2->id],
            'assignees' => [$user->id],
        ];
        $response = $this->apiRequest('POST', $this->baseUrl, $actionPlan);

        $response
            ->assertStatus(201)
            ->assertJsonStructure([
                'data' => $this->actionPlanStructure,
            ])
            ->assertJson([
                'data' => [
                    'description' => $actionPlan['description'],
                    'due_date' => $actionPlan['due_date'],
                    'note' => $actionPlan['note'],
                    'status' => $actionPlan['status'],
                    'streams' => [
                        [
                            'id' => $stream->id,
                        ],
                    ],
                    'areas' =>[
                        [
                            'id' => $area1->id,
                        ],
                        [
                            'id' => $area2->id,
                        ],
                    ],
                ],
            ]);
    }

    public function testCreateActionPlanWithSubArea()
    {
        $user = factory(User::class)->create();
        $stream = factory(SelfAssessmentStream::class)->create();
        $areaGroup = factory(SelfAssessmentAreaGroup::class)->create([
            'self_assessment_stream_id' => $stream->id,
        ]);
        $area = factory(SelfAssessmentArea::class)->create([
            'self_assessment_area_group_id' => $areaGroup->id,
        ]);
        $subArea1 = factory(SelfAssessmentSubArea::class)->create([
            'self_assessment_area_id' => $area->id,
        ]);
        $subArea2 = factory(SelfAssessmentSubArea::class)->create([
            'self_assessment_area_id' => $area->id,
        ]);
        $actionPlan = [
            'description' => 'Action plan',
            'due_date' => '2020-01-01',
            'note' => 'Sample note',
            'status' => 1,
            'streams' => "$stream->id",
            'areas' => "$area->id",
            'sub_areas' => [$subArea1->id, $subArea2->id],
            'assignees' => [$user->id],
        ];
        $response = $this->apiRequest('POST', $this->baseUrl, $actionPlan);

        $response
            ->assertStatus(201)
            ->assertJsonStructure([
                'data' => $this->actionPlanStructure,
            ])
            ->assertJson([
                'data' => [
                    'description' => $actionPlan['description'],
                    'due_date' => $actionPlan['due_date'],
                    'note' => $actionPlan['note'],
                    'status' => $actionPlan['status'],
                    'streams' => [
                        [
                            'id' => $stream->id,
                        ],
                    ],
                    'areas' => [
                        [
                            'id' => $area->id,
                        ],
                    ],
                    'sub_areas' =>[
                        [
                            'id' => $subArea1->id,
                        ],
                        [
                            'id' => $subArea2->id,
                        ],
                    ],
                ],
            ]);
    }

    public function testCreateActionPlanHistories()
    {
        $creatorToken = $this->getAccessToken('creator@mail.com');
        $creator = User::where('email', 'creator@mail.com')->first();

        $user = factory(User::class)->create();
        $actionPlan = [
            'description' => 'Action plan',
            'due_date' => '2020-01-01',
            'note' => 'Sample note',
            'status' => 1,
            'assignees' => [$user->id],
        ];
        $this->apiRequest('POST', $this->baseUrl, $actionPlan, $creatorToken);

        $persistedActionPlan = SelfAssessmentActionPlan::where([
            'description' => $actionPlan['description'],
        ])->first();
        $historiesUrl = "{$this->baseUrl}/{$persistedActionPlan->id}/histories";

        $response = $this->apiRequest('GET', $historiesUrl);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->historyStructure,
                ],
            ])
            ->assertJson([
                'data' => [
                    [
                        'user' => [
                            'id' => $creator->id,
                        ],
                        'change_type' => 'create',
                        'change_type_displayed' => 'membuat',
                    ]
                ],
            ]);
    }

    public function testUpdateActionPlan()
    {
        $actionPlan = factory(SelfAssessmentActionPlan::class)->create();

        $id = $actionPlan->id;
        $updatedActionPlan = [
            'description' => 'Updated description',
            'note' => 'Updated note',
            'status' => 2,
            'due_date' => '2020-12-01',
        ];
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('PATCH', $url, $updatedActionPlan);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => $this->actionPlanStructure,
            ])
            ->assertJson([
                'data' => $updatedActionPlan,
            ]);
    }

    public function testUpdateActionPlanHistories()
    {
        $creatorToken = $this->getAccessToken('creator@mail.com');
        $creator = User::where('email', 'creator@mail.com')->first();

        $actionPlan = factory(SelfAssessmentActionPlan::class)->create();

        $id = $actionPlan->id;
        $updatedActionPlan = [
            'description' => 'Updated description',
            'note' => 'Updated note',
            'status' => 2,
            'due_date' => '2020-12-01',
        ];
        $url = $this->baseUrl.'/'.$id;

        $this->apiRequest('PATCH', $url, $updatedActionPlan, $creatorToken);

        $historiesUrl = "{$this->baseUrl}/{$id}/histories";

        $response = $this->apiRequest('GET', $historiesUrl);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->historyStructure,
                ],
            ])
            ->assertJson([
                'data' => [
                    [
                        'user' => [
                            'id' => $creator->id,
                        ],
                        'change_type' => 'update',
                        'change_type_displayed' => 'memperbarui',
                        'field_name' => 'description',
                        'field_name_displayed' => 'deskripsi',
                        'from' => $actionPlan->description,
                        'to' => $updatedActionPlan['description'],
                    ]
                ],
            ]);
    }

    public function testRemoveActionPlan()
    {
        $actionPlan = factory(SelfAssessmentActionPlan::class)->create();
        $id = $actionPlan->id;
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('DELETE', $url);

        $response->assertStatus(200);

        $this->assertDeleted($actionPlan);
    }
}
