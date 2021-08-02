<?php

namespace Tests\Feature\Api\SelfAssessment;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\ActionPlanCategory;
use Tests\TestCase;
use Tests\ApiHelpers;

class ActionPlanCategoriesTest extends TestCase
{
    use RefreshDatabase, ApiHelpers;

    protected $baseUrl = '/api/action-plan-categories';
    protected $actionPlanCategoryStructure  = [
        'id',
        'name',
        'created_at',
        'updated_at',
    ];

    public function testGetActionPlanCategories()
    {
        $actionPlanCategory = factory(ActionPlanCategory::class)->create();
        $url = $this->baseUrl;
        $response = $this->apiRequest('GET', $url);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->actionPlanCategoryStructure,
                ],
            ])
            ->assertJson([
                'data' => [
                    [
                        'id' => $actionPlanCategory->id,
                    ]
                ]
            ]);
    }

    public function testCreateActionPlanCategory()
    {
        $actionPlanCategory = [
            'name' => 'Category',
        ];

        $response = $this->apiRequest('POST', $this->baseUrl, $actionPlanCategory);

        $response
            ->assertStatus(201)
            ->assertJson([
                'data' => [
                    'name' => $actionPlanCategory['name'],
                ],
            ]);
    }

    public function testUpdateActionPlanCategory()
    {
        $actionPlanCategory = factory(ActionPlanCategory::class)->create();
        $id = $actionPlanCategory->id;
        $upatedActionPlanCategory = [
            'name' => 'Category Updated',
        ];
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('PATCH', $url, $upatedActionPlanCategory);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'name' => $upatedActionPlanCategory['name'],
                ],
            ]);
    }

    public function testDeleteActionPlanCategory()
    {
        $actionPlanCategory = factory(ActionPlanCategory::class)->create();
        $id = $actionPlanCategory->id;
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('DELETE', $url);

        $response->assertStatus(200);

        $this->assertDeleted($actionPlanCategory);
    }
}
