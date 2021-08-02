<?php

namespace Tests\Feature\Api\PerformanceMonitoring;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\PerformanceActionPlan;
use App\Models\PerformanceTemplate;
use App\Models\User;
use Tests\TestCase;
use Tests\ApiUrls;
use Tests\ApiHelpers;

class ActionPlansTest extends TestCase
{
    use RefreshDatabase, ApiUrls, ApiHelpers;

    protected $baseUrl = '/api/performance-monitoring/action-plans';
    protected $actionPlanStructure = [
        'id',
        'description',
        'due_date',
        'note',
        'status',
        'created_at',
        'updated_at',
        'performance_template' => [
            'id',
            'name',
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
        $template = factory(PerformanceTemplate::class)->create();
        $actionPlan = [
            'description' => 'Action plan',
            'due_date' => '2020-01-01',
            'note' => 'Sample note',
            'status' => 1,
            'performance_template_id' => $template->id,
            'assignees' => [$user->id],
        ];
        $response = $this->apiRequest('POST', $this->baseUrl, $actionPlan);

        $response
            ->assertStatus(201)
            ->assertJsonStructure([
                'data' => $this->actionPlanStructure,
            ]);
    }

    public function testCreateActionPlanHistories()
    {
        $creatorToken = $this->getAccessToken('creator@mail.com');
        $creator = User::where('email', 'creator@mail.com')->first();

        $user = factory(User::class)->create();
        $template = factory(PerformanceTemplate::class)->create();
        $actionPlan = [
            'description' => 'Action plan',
            'due_date' => '2020-01-01',
            'note' => 'Sample note',
            'status' => 1,
            'performance_template_id' => $template->id,
            'assignees' => [$user->id],
        ];
        $this->apiRequest('POST', $this->baseUrl, $actionPlan, $creatorToken);

        $persistedActionPlan = PerformanceActionPlan::where([
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
        $actionPlan = factory(PerformanceActionPlan::class)->create();
        $template = factory(PerformanceTemplate::class)->create();

        $actionPlan->performanceTemplate()->associate($template);
        $actionPlan->save();

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

        $actionPlan = factory(PerformanceActionPlan::class)->create();
        $template = factory(PerformanceTemplate::class)->create();

        $actionPlan->performanceTemplate()->associate($template);
        $actionPlan->save();

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

    public function testRemoveTemplateFromActionPlan()
    {
        $actionPlan = factory(PerformanceActionPlan::class)->create();
        $template = factory(PerformanceTemplate::class)->create();

        $actionPlan->performanceTemplate()->associate($template);
        $actionPlan->save();

        $id = $actionPlan->id;
        $updatedActionPlan = [
            'description' => 'Updated description',
            'note' => 'Updated note',
            'status' => 2,
            'due_date' => '2020-12-01',
            'performance_template_id' => NULL,
        ];
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('PATCH', $url, $updatedActionPlan);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'description' => 'Updated description',
                    'note' => 'Updated note',
                    'status' => 2,
                    'due_date' => '2020-12-01',
                    'performance_template' => NULL,
                ],
            ]);
    }

    public function testRemoveActionPlan()
    {
        $actionPlan = factory(PerformanceActionPlan::class)->create();
        $id = $actionPlan->id;
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('DELETE', $url);

        $response->assertStatus(200);

        $this->assertDeleted($actionPlan);
    }
}
