<?php

namespace Tests\Feature\Api\SelfAssessment;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\SelfAssessmentAreaGroup;
use App\Models\SelfAssessmentStream;
use Tests\TestCase;
use Tests\ApiHelpers;

class AreaGroupsTest extends TestCase
{
    use RefreshDatabase, ApiHelpers;

    protected $baseUrl = '/api/self-assessment/area-groups';
    protected $areaGroupStructure  = [
        'id',
        'name',
        'weight',
    ];

    public function testGetAreaGroups()
    {
        $stream = factory(SelfAssessmentStream::class)->create();
        $areaGroup = factory(SelfAssessmentAreaGroup::class)->create([
            'self_assessment_stream_id' => $stream->id,
        ]);
        $url = "$this->baseUrl?stream_id=$stream->id";
        $response = $this->apiRequest('GET', $url);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->areaGroupStructure,
                ],
            ])
            ->assertJson([
                'data' => [
                    [
                        'id' => $areaGroup->id,
                    ]
                ]
            ]);
    }

    public function testGetAreaGroupsWithNestedChildren()
    {
        $stream = factory(SelfAssessmentStream::class)->create();
        $areaGroupParent = factory(SelfAssessmentAreaGroup::class)->create([
            'self_assessment_stream_id' => $stream->id,
        ]);
        $areaGroupChild = factory(SelfAssessmentAreaGroup::class)->create([
            'parent_id' => $areaGroupParent->id,
            'self_assessment_stream_id' => $stream->id,
        ]);
        $areaGroupGrandChild = factory(SelfAssessmentAreaGroup::class)->create([
            'parent_id' => $areaGroupChild->id,
            'self_assessment_stream_id' => $stream->id,
        ]);

        $url = "$this->baseUrl?stream_id=$stream->id";
        $response = $this->apiRequest('GET', $url);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->areaGroupStructure,
                ],
            ])
            ->assertJson([
                'data' => [
                    [
                        'id' => $areaGroupParent->id,
                        'children' => [
                            [
                                'id' => $areaGroupChild->id,
                                'children' => [
                                    [
                                        'id' => $areaGroupGrandChild->id,
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]);
    }

    public function testGetAreaGroupsWithoutStreamId()
    {
        $stream = factory(SelfAssessmentStream::class)->create();
        $areaGroup = factory(SelfAssessmentAreaGroup::class)->create([
            'self_assessment_stream_id' => $stream->id,
        ]);

        $response = $this->apiRequest('GET', $this->baseUrl);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => []
            ]);
    }

    public function testCreateAreaGroup()
    {
        $stream = factory(SelfAssessmentStream::class)->create();
        $areaGroup = [
            'name' => 'TestAreaGroup',
            'weight' => 1,
            'stream_id' => $stream->id,
        ];

        $response = $this->apiRequest('POST', $this->baseUrl, $areaGroup);

        $response
            ->assertStatus(201)
            ->assertJson([
                'data' => [
                    'name' => $areaGroup['name'],
                    'weight' => $areaGroup['weight'],
                ],
            ]);
    }

    public function testUpdateAreaGroup()
    {
        $stream = factory(SelfAssessmentStream::class)->create();
        $areaGroup = factory(SelfAssessmentAreaGroup::class)->create([
            'self_assessment_stream_id' => $stream->id,
        ]);
        $id = $areaGroup->id;
        $upatedAreaGroup = [
            'name' => 'TestAreaGroup Updated',
            'weight' => 0.5,
            'stream_id' => $stream->id,
        ];
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('PATCH', $url, $upatedAreaGroup);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'name' => $upatedAreaGroup['name'],
                    'weight' => $upatedAreaGroup['weight'],
                ],
            ]);
    }

    public function testDeleteAreaGroup()
    {
        $stream = factory(SelfAssessmentStream::class)->create();
        $areaGroup = factory(SelfAssessmentAreaGroup::class)->create([
            'self_assessment_stream_id' => $stream->id,
        ]);
        $id = $areaGroup->id;
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('DELETE', $url);

        $response->assertStatus(200);

        $this->assertDeleted($areaGroup);
    }
}
