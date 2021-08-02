<?php

namespace Tests\Feature\Api\SelfAssessment;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\RankGroup;
use Tests\TestCase;
use Tests\ApiHelpers;

class RankGroupTest extends TestCase
{
    use RefreshDatabase, ApiHelpers;

    protected $baseUrl = '/api/rank-groups';
    protected $rankGroupStructure  = [
        'id',
        'title',
        'order',
        'color',
        'created_at',
        'updated_at',
    ];

    public function testGetRankGroup()
    {
        $rankGroup = factory(RankGroup::class)->create();
        $response = $this->apiRequest('GET', $this->baseUrl);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->rankGroupStructure,
                ],
            ])
            ->assertJson([
                'data' => [
                    [
                        'id' => $rankGroup->id,
                    ]
                ]
            ]);
    }

    public function testCreateRankGroup()
    {
        $rankGroup = [
            'title' => 'Gold',
            'order' => 1,
            'color' => '#123123',
        ];

        $response = $this->apiRequest('POST', $this->baseUrl, $rankGroup);

        $response
            ->assertStatus(201)
            ->assertJson([
                'data' => [
                    'title' => $rankGroup['title'],
                    'order' => $rankGroup['order'],
                    'color' => $rankGroup['color'],
                ],
            ]);
    }

    public function testUpdateRankGroup()
    {
        $rankGroup = factory(RankGroup::class)->create();
        $updatedRankGroup = [
            'title' => 'Group Updated',
            'order' => 2,
            'color' => '#000000',
        ];
        $url = $this->baseUrl.'/'.$rankGroup->id;

        $response = $this->apiRequest('PATCH', $url, $updatedRankGroup);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'title' => $updatedRankGroup['title'],
                    'order' => $updatedRankGroup['order'],
                    'color' => $updatedRankGroup['color'],
                ],
            ]);
    }

    public function testDeleteRankGroup()
    {
        $rankGroup = factory(RankGroup::class)->create();
        $url = $this->baseUrl.'/'.$rankGroup->id;

        $response = $this->apiRequest('DELETE', $url);

        $response->assertStatus(200);

        $this->assertDeleted($rankGroup);
    }
}
