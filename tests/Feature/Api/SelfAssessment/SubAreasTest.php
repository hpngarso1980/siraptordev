<?php

namespace Tests\Feature\Api\SelfAssessment;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\SelfAssessmentArea;
use App\Models\SelfAssessmentAreaGroup;
use App\Models\SelfAssessmentStream;
use App\Models\SelfAssessmentSubArea;
use Tests\TestCase;
use Tests\ApiHelpers;

class SubAreasTest extends TestCase
{
    use RefreshDatabase, ApiHelpers;

    protected $baseUrl = '/api/self-assessment/sub-areas';
    protected $subAreaStructure  = [
        'id',
        'name',
        'weight',
        'score_target',
        'created_at',
        'updated_at',
    ];

    public function testGetSubAreas()
    {
        $area = $this->setupArea();
        $subArea = factory(SelfAssessmentSubArea::class)->create([
            'self_assessment_area_id' => $area->id,
        ]);
        $url = "$this->baseUrl?area_id=$area->id";
        $response = $this->apiRequest('GET', $url);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->subAreaStructure,
                ],
                'meta' => [
                    'from',
                    'to',
                    'per_page',
                    'total',
                    'path',
                    'current_page',
                    'last_page'
                ],
            ])
            ->assertJson([
                'data' => [
                    [
                        'id' => $subArea->id,
                    ]
                ]
            ]);
    }

    public function testGetSubAreasWithoutAreaId()
    {
        $area = $this->setupArea();
        $subArea = factory(SelfAssessmentSubArea::class)->create([
            'self_assessment_area_id' => $area->id,
        ]);
        $response = $this->apiRequest('GET', $this->baseUrl);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->subAreaStructure,
                ],
                'meta' => [
                    'from',
                    'to',
                    'per_page',
                    'total',
                    'path',
                    'current_page',
                    'last_page'
                ],
            ])
            ->assertJson([
                'data' => [],
            ]);
    }

    public function testGetSingleArea()
    {
        $area = $this->setupArea();
        $subArea = factory(SelfAssessmentSubArea::class)->create([
            'self_assessment_area_id' => $area->id,
        ]);
        $url = "$this->baseUrl/$subArea->id";

        $response = $this->apiRequest('GET', $url);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => $this->subAreaStructure,
            ])
            ->assertJson([
                'data' => [
                    'id' => $subArea->id,
                ],
            ]);
    }

    public function testCreateArea()
    {
        $area = $this->setupArea();
        $subArea = [
            'name' => 'TestSubArea',
            'weight' => 0.8,
            'score_target' => 4,
            'area_id' => $area->id,
        ];

        $response = $this->apiRequest('POST', $this->baseUrl, $subArea);

        $response
            ->assertStatus(201)
            ->assertJson([
                'data' => [
                    'name' => $subArea['name'],
                    'weight' => $subArea['weight'],
                    'self_assessment_area_id' => $subArea['area_id'],
                    'score_target' => $subArea['score_target'],
                ],
            ]);
    }

    public function testUpdateArea()
    {
        $area = $this->setupArea();
        $subArea = factory(SelfAssessmentSubArea::class)->create([
            'self_assessment_area_id' => $area->id,
        ]);
        $id = $subArea->id;
        $upatedSubArea = [
            'name' => 'TestSubArea Updated',
            'weight' => 0.5,
            'score_target' => 1,
            'area_id' => $subArea->self_assessment_area_id,
        ];
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('PATCH', $url, $upatedSubArea);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'name' => $upatedSubArea['name'],
                    'weight' => $upatedSubArea['weight'],
                    'score_target' => $upatedSubArea['score_target'],
                ],
            ]);
    }

    public function testDeleteArea()
    {
        $area = $this->setupArea();
        $subArea = factory(SelfAssessmentSubArea::class)->create([
            'self_assessment_area_id' => $area->id,
        ]);
        $id = $subArea->id;
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('DELETE', $url);

        $response->assertStatus(200);

        $this->assertDeleted($subArea);
    }

    private function setupArea()
    {
        $stream = factory(SelfAssessmentStream::class)->create();
        $areaGroup = factory(SelfAssessmentAreaGroup::class)->create([
            'self_assessment_stream_id' => $stream->id,
        ]);
        $area = factory(SelfAssessmentArea::class)->create([
            'self_assessment_area_group_id' => $areaGroup->id,
        ]);

        return $area;
    }
}
