<?php

namespace Tests\Feature\Api\SelfAssessment;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\SelfAssessmentArea;
use App\Models\SelfAssessmentAreaGroup;
use App\Models\SelfAssessmentStream;
use Tests\TestCase;
use Tests\ApiHelpers;

class AreasTest extends TestCase
{
    use RefreshDatabase, ApiHelpers;

    protected $baseUrl = '/api/self-assessment/areas';
    protected $areaStructure  = [
        'id',
        'name',
        'score_target',
        'created_at',
        'updated_at',
    ];

    public function testGetAreas()
    {
        $areaGroup = $this->prepareAreaGroup();
        $area = factory(SelfAssessmentArea::class)->create([
            'self_assessment_area_group_id' => $areaGroup->id,
        ]);
        $url = "$this->baseUrl?area_group_id=$areaGroup->id";
        $response = $this->apiRequest('GET', $url);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->areaStructure,
                ],
            ])
            ->assertJson([
                'data' => [
                    [
                        'id' => $area->id,
                    ]
                ]
            ]);
    }

    public function testGetAreasByStreamId()
    {
        $stream = factory(SelfAssessmentStream::class)->create();
        $areaGroup = factory(SelfAssessmentAreaGroup::class)->create([
            'self_assessment_stream_id' => $stream->id,
        ]);
        $area = factory(SelfAssessmentArea::class)->create([
            'self_assessment_area_group_id' => $areaGroup->id,
        ]);
        $url = "$this->baseUrl?stream_id=$stream->id";
        $response = $this->apiRequest('GET', $url);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->areaStructure,
                ],
            ])
            ->assertJson([
                'data' => [
                    [
                        'id' => $area->id,
                    ]
                ]
            ]);
    }

    public function testGetAreasWithoutAreaGroupId()
    {
        $areaGroup = $this->prepareAreaGroup();
        $area = factory(SelfAssessmentArea::class)->create([
            'self_assessment_area_group_id' => $areaGroup->id,
        ]);
        $response = $this->apiRequest('GET', $this->baseUrl);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [],
            ]);
    }

    public function testCreateArea()
    {
        $areaGroup = $this->prepareAreaGroup();
        $area = [
            'name' => 'TestArea',
            'score_target' => 4,
            'area_group_id' => $areaGroup->id,
        ];

        $response = $this->apiRequest('POST', $this->baseUrl, $area);

        $response
            ->assertStatus(201)
            ->assertJson([
                'data' => [
                    'name' => $area['name'],
                    'score_target' => $area['score_target'],
                    'self_assessment_area_group_id' => $area['area_group_id'],
                ],
            ]);
    }

    public function testUpdateArea()
    {
        $areaGroup = $this->prepareAreaGroup();
        $area = factory(SelfAssessmentArea::class)->create([
            'self_assessment_area_group_id' => $areaGroup->id,
        ]);
        $id = $area->id;
        $upatedArea = [
            'name' => 'TestArea Updated',
            'score_target' => 1,
            'area_group_id' => $area->self_assessment_area_group_id,
        ];
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('PATCH', $url, $upatedArea);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'name' => $upatedArea['name'],
                    'score_target' => $upatedArea['score_target'],
                ],
            ]);
    }

    public function testDeleteArea()
    {
        $areaGroup = $this->prepareAreaGroup();
        $area = factory(SelfAssessmentArea::class)->create([
            'self_assessment_area_group_id' => $areaGroup->id,
        ]);
        $id = $area->id;
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('DELETE', $url);

        $response->assertStatus(200);

        $this->assertDeleted($area);
    }

    private function prepareAreaGroup()
    {
        $stream = factory(SelfAssessmentStream::class)->create();
        $areaGroup = factory(SelfAssessmentAreaGroup::class)->create([
            'self_assessment_stream_id' => $stream->id,
        ]);

        return $areaGroup;
    }
}
