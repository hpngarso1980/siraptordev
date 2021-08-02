<?php

namespace Tests\Feature\Api\SelfAssessment;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\SelfAssessmentCriterion;
use App\Models\SelfAssessmentStream;
use App\Models\SelfAssessmentArea;
use App\Models\SelfAssessmentAreaGroup;
use App\Models\SelfAssessmentSubArea;
use Tests\TestCase;
use Tests\ApiHelpers;

class CriteriaTest extends TestCase
{
    use RefreshDatabase, ApiHelpers;

    protected $baseUrl = '/api/self-assessment/criteria';
    protected $criterionStructure  = [
        'id',
        'score',
        'level',
        'description',
        'created_at',
        'updated_at',
        'self_assessment_sub_area' => [
            'id',
            'name',
        ],
    ];

    public function testGetCriteria()
    {
        $subArea = $this->setupSubArea();
        $criterion = factory(SelfAssessmentCriterion::class)->create([
            'self_assessment_sub_area_id' => $subArea->id,
        ]);
        $url = "$this->baseUrl?sub_area_id=$subArea->id";
        $response = $this->apiRequest('GET', $url);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->criterionStructure,
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
                        'id' => $criterion->id,
                    ]
                ]
            ]);
    }

    public function testGetCriteriaWithoutSubAreaId()
    {
        $subArea = $this->setupSubArea();
        $criterion = factory(SelfAssessmentCriterion::class)->create([
            'self_assessment_sub_area_id' => $subArea->id,
        ]);
        $response = $this->apiRequest('GET', $this->baseUrl);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->criterionStructure,
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

    public function testCreateCriterion()
    {
        $subArea = $this->setupSubArea();
        $criterion = [
            'score' => '< 1',
            'level' => 'Any level',
            'description' => 'Any description',
            'sub_area_id' => $subArea->id,
        ];

        $response = $this->apiRequest('POST', $this->baseUrl, $criterion);

        $response
            ->assertStatus(201)
            ->assertJson([
                'data' => [
                    'score' => $criterion['score'],
                    'level' => $criterion['level'],
                    'description' => $criterion['description'],
                    'self_assessment_sub_area' => [
                        'id' => $subArea->id,
                        'name' => $subArea->name,
                    ],
                ],
            ]);
    }

    public function testUpdateCriterion()
    {
        $subArea = $this->setupSubArea();
        $criterion = factory(SelfAssessmentCriterion::class)->create([
            'self_assessment_sub_area_id' => $subArea->id,
        ]);
        $id = $criterion->id;
        $upatedCriterion = [
            'score' => '< 2',
            'level' => 'Updated level',
            'description' => 'Updated description',
            'sub_area_id' => $criterion->self_assessment_sub_area_id,
        ];
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('PATCH', $url, $upatedCriterion);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'score' => $upatedCriterion['score'],
                    'level' => $upatedCriterion['level'],
                    'description' => $upatedCriterion['description'],
                ],
            ]);
    }

    public function testDeleteCriterion()
    {
        $subArea = $this->setupSubArea();
        $criterion = factory(SelfAssessmentCriterion::class)->create([
            'self_assessment_sub_area_id' => $subArea->id,
        ]);
        $id = $criterion->id;
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('DELETE', $url);

        $response->assertStatus(200);

        $this->assertDeleted($criterion);
    }

    private function setupSubArea()
    {
        $stream = factory(SelfAssessmentStream::class)->create();
        $areaGroup = factory(SelfAssessmentAreaGroup::class)->create([
            'self_assessment_stream_id' => $stream->id,
        ]);
        $area = factory(SelfAssessmentArea::class)->create([
            'self_assessment_area_group_id' => $areaGroup->id,
        ]);
        $subArea = factory(SelfAssessmentSubArea::class)->create([
            'self_assessment_area_id' => $area->id,
        ]);

        return $subArea;
    }
}
