<?php

namespace Tests\Feature\Api\PerformanceMonitoring;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\PerformanceIndicator;
use App\Models\PerformanceIndicatorGroup;
use App\Models\PerformanceTemplate;
use Tests\TestCase;
use Tests\ApiHelpers;

class IndicatorsTest extends TestCase
{
    use RefreshDatabase, ApiHelpers;

    protected $baseUrl = '/api/performance-monitoring/templates';
    protected $indicatorGroupStructure = [
        'id',
        'title',
        'slug',
        'deduction',
    ];
    protected $indicatorStructure  = [
        'id',
        'parent_id',
        'code',
        'indicator',
        'unit',
        'weight',
        'indicator_group',
        'children',
    ];

    public function testGetIndicators()
    {
        $indicatorGroup = factory(PerformanceIndicatorGroup::class)->create();
        $template = factory(PerformanceTemplate::class)->create();
        $indicators = factory(PerformanceIndicator::class, 5)->create([
            'performance_template_id' => $template->id,
            'performance_indicator_group_id' => $indicatorGroup->id,
        ]);

        $response = $this->apiRequest('GET', $this->createIndicatorUrl($template->id));

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => array_merge(
                        $this->indicatorGroupStructure,
                        [
                            'indicators' => [
                                '*' => $this->indicatorStructure,
                            ],
                        ]
                    )
                ],
            ])
            ->assertJson([
                'data' => [
                    [
                        'id' => $indicatorGroup->id,
                        'title' => $indicatorGroup->title,
                        'slug' => $indicatorGroup->slug,
                        'deduction' => $indicatorGroup->deduction,
                    ],
                ],
            ]);
    }

    public function testGetEmptyIndicators()
    {
        $indicatorGroup = factory(PerformanceIndicatorGroup::class)->create();
        $template = factory(PerformanceTemplate::class)->create();

        $response = $this->apiRequest('GET', $this->createIndicatorUrl($template->id));

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => array_merge(
                        $this->indicatorGroupStructure,
                        [
                            'indicators' => [],
                        ]
                    )
                ],
            ])
            ->assertJson([
                'data' => [
                    [
                        'id' => $indicatorGroup->id,
                        'title' => $indicatorGroup->title,
                        'slug' => $indicatorGroup->slug,
                        'deduction' => $indicatorGroup->deduction,
                    ],
                ],
            ]);

    }

    public function testGetIndicatorsWithChildren()
    {
        $indicatorGroup = factory(PerformanceIndicatorGroup::class)->create();
        $template = factory(PerformanceTemplate::class)->create();
        $indicatorParent = factory(PerformanceIndicator::class)->create([
            'performance_template_id' => $template->id,
            'performance_indicator_group_id' => $indicatorGroup->id,
        ]);
        $indicatorChild = factory(PerformanceIndicator::class)->create([
            'parent_id' => $indicatorParent->id,
            'performance_template_id' => $template->id,
            'performance_indicator_group_id' => $indicatorGroup->id,
        ]);

        $response = $this->apiRequest('GET', $this->createIndicatorUrl($template->id));

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => array_merge(
                        $this->indicatorGroupStructure,
                        [
                            'indicators' => [
                                '*' => array_merge(
                                    $this->indicatorStructure,
                                    [
                                        'children' => [
                                            '*' => $this->indicatorStructure,
                                        ],
                                    ]
                                ),
                            ],
                        ]
                    )
                ],
            ])
            ->assertJson([
                'data' => [
                    [
                        'id' => $indicatorGroup->id,
                        'title' => $indicatorGroup->title,
                        'slug' => $indicatorGroup->slug,
                        'deduction' => $indicatorGroup->deduction,
                        'indicators' => [
                            [
                                'id' => $indicatorParent->id,
                                'children' => [
                                    [
                                        'id' => $indicatorChild->id,
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ]);
    }

    public function testCreateIndicators()
    {
        $indicatorGroup = factory(PerformanceIndicatorGroup::class)->create();
        $template = factory(PerformanceTemplate::class)->create();
        $url = $this->createIndicatorUrl($template->id);

        $indicators = [
            'indicators' => [
                [
                    'code' => 'P1',
                    'indicator' => 'Parent Indicator',
                    'unit' => '%',
                    'weight' => 0.5,
                    'performance_indicator_group_id' => $indicatorGroup->id,
                    'children' => [
                        [
                            'code' => 'C1',
                            'indicator' => 'Children Indicator',
                            'unit' => '%',
                            'weight' => 0.5,
                            'performance_indicator_group_id' => $indicatorGroup->id,
                            'children' => [
                                [
                                    'code' => 'GC1',
                                    'indicator' => 'Grand children Indicator',
                                    'unit' => '%',
                                    'weight' => 0.5,
                                    'performance_indicator_group_id' => $indicatorGroup->id,
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ];

        $response = $this->apiRequest('POST', $url, $indicators);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    [
                        'id' => $indicatorGroup->id,
                        'indicators' => [
                            [
                                'code' => 'P1',
                                'indicator' => 'Parent Indicator',
                                'unit' => '%',
                                'weight' => 0.5,
                                'indicator_group' => [
                                    'id' => $indicatorGroup->id,
                                ],
                                'children' => [
                                    [
                                        'code' => 'C1',
                                        'indicator' => 'Children Indicator',
                                        'unit' => '%',
                                        'weight' => 0.5,
                                        'indicator_group' => [
                                            'id' => $indicatorGroup->id,
                                        ],
                                        'children' => [
                                            [
                                                'code' => 'GC1',
                                                'indicator' => 'Grand children Indicator',
                                                'unit' => '%',
                                                'weight' => 0.5,
                                                'indicator_group' => [
                                                    'id' => $indicatorGroup->id,
                                                ],
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ]);

        $this->assertDatabaseHas('performance_indicators', [
            'code' => 'P1',
            'indicator' => 'Parent Indicator',
            'unit' => '%',
            'weight' => 0.5,
            'performance_indicator_group_id' => $indicatorGroup->id,
        ]);
        $this->assertDatabaseHas('performance_indicators', [
            'code' => 'C1',
            'indicator' => 'Children Indicator',
            'unit' => '%',
            'weight' => 0.5,
            'performance_indicator_group_id' => $indicatorGroup->id,
        ]);
        $this->assertDatabaseHas('performance_indicators', [
            'code' => 'GC1',
            'indicator' => 'Grand children Indicator',
            'unit' => '%',
            'weight' => 0.5,
            'performance_indicator_group_id' => $indicatorGroup->id,
        ]);
    }

    public function testUpdateIndicators()
    {
        $indicatorGroup = factory(PerformanceIndicatorGroup::class)->create();
        $template = factory(PerformanceTemplate::class)->create();
        $indicatorParent = factory(PerformanceIndicator::class)->create([
            'performance_template_id' => $template->id,
            'performance_indicator_group_id' => $indicatorGroup->id,
        ]);
        $indicatorChild = factory(PerformanceIndicator::class)->create([
            'parent_id' => $indicatorParent->id,
            'performance_template_id' => $template->id,
            'performance_indicator_group_id' => $indicatorGroup->id,
        ]);
        $indicatorGrandChild = factory(PerformanceIndicator::class)->create([
            'parent_id' => $indicatorChild->id,
            'performance_template_id' => $template->id,
            'performance_indicator_group_id' => $indicatorGroup->id,
        ]);
        $url = $this->createIndicatorUrl($template->id);

        $indicators = [
            'indicators' => [
                [
                    'id' => $indicatorParent->id,
                    'code' => 'P1',
                    'indicator' => 'Parent Indicator',
                    'unit' => '%',
                    'weight' => 0.5,
                    'performance_indicator_group_id' => $indicatorGroup->id,
                    'children' => [
                        [
                            'id' => $indicatorChild->id,
                            'code' => 'C1',
                            'indicator' => 'Children Indicator',
                            'unit' => '%',
                            'weight' => 0.5,
                            'performance_indicator_group_id' => $indicatorGroup->id,
                            'children' => [
                                [
                                    'id' => $indicatorGrandChild->id,
                                    'code' => 'GC1',
                                    'indicator' => 'Grand children Indicator',
                                    'unit' => '%',
                                    'weight' => 0.5,
                                    'performance_indicator_group_id' => $indicatorGroup->id,
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ];

        $response = $this->apiRequest('POST', $url, $indicators);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    [
                        'id' => $indicatorGroup->id,
                        'indicators' => [
                            [
                                'id' => $indicatorParent->id,
                                'code' => 'P1',
                                'indicator' => 'Parent Indicator',
                                'unit' => '%',
                                'weight' => 0.5,
                                'indicator_group' => [
                                    'id' => $indicatorGroup->id,
                                ],
                                'children' => [
                                    [
                                        'id' => $indicatorChild->id,
                                        'code' => 'C1',
                                        'indicator' => 'Children Indicator',
                                        'unit' => '%',
                                        'weight' => 0.5,
                                        'indicator_group' => [
                                            'id' => $indicatorGroup->id,
                                        ],
                                        'children' => [
                                            [
                                                'id' => $indicatorGrandChild->id,
                                                'code' => 'GC1',
                                                'indicator' => 'Grand children Indicator',
                                                'unit' => '%',
                                                'weight' => 0.5,
                                                'indicator_group' => [
                                                    'id' => $indicatorGroup->id,
                                                ],
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ]);

        $this->assertDatabaseHas('performance_indicators', [
            'id' => $indicatorParent->id,
            'code' => 'P1',
            'indicator' => 'Parent Indicator',
            'unit' => '%',
            'weight' => 0.5,
            'performance_indicator_group_id' => $indicatorGroup->id,
        ]);
        $this->assertDatabaseHas('performance_indicators', [
            'id' => $indicatorChild->id,
            'code' => 'C1',
            'indicator' => 'Children Indicator',
            'unit' => '%',
            'weight' => 0.5,
            'performance_indicator_group_id' => $indicatorGroup->id,
        ]);
        $this->assertDatabaseHas('performance_indicators', [
            'id' => $indicatorGrandChild->id,
            'code' => 'GC1',
            'indicator' => 'Grand children Indicator',
            'unit' => '%',
            'weight' => 0.5,
            'performance_indicator_group_id' => $indicatorGroup->id,
        ]);
    }

    public function testDeleteIndicators()
    {
        $indicatorGroup = factory(PerformanceIndicatorGroup::class)->create();
        $template = factory(PerformanceTemplate::class)->create();
        $indicatorParent = factory(PerformanceIndicator::class)->create([
            'performance_template_id' => $template->id,
            'performance_indicator_group_id' => $indicatorGroup->id,
        ]);
        $indicatorChild = factory(PerformanceIndicator::class)->create([
            'parent_id' => $indicatorParent->id,
            'performance_template_id' => $template->id,
            'performance_indicator_group_id' => $indicatorGroup->id,
        ]);
        $indicatorGrandChild = factory(PerformanceIndicator::class)->create([
            'parent_id' => $indicatorChild->id,
            'performance_template_id' => $template->id,
            'performance_indicator_group_id' => $indicatorGroup->id,
        ]);
        $url = $this->createIndicatorUrl($template->id);

        $indicators = [
            'deleted' => [
                $indicatorGrandChild->id,
            ],
        ];

        $response = $this->apiRequest('POST', $url, $indicators);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    [
                        'id' => $indicatorGroup->id,
                        'indicators' => [
                            [
                                'id' => $indicatorParent->id,
                                'indicator_group' => [
                                    'id' => $indicatorGroup->id,
                                ],
                                'children' => [
                                    [
                                        'id' => $indicatorChild->id,
                                        'indicator_group' => [
                                            'id' => $indicatorGroup->id,
                                        ],
                                        'children' => [],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ]);

        $this->assertDatabaseHas('performance_indicators', [
            'id' => $indicatorParent->id,
        ]);
        $this->assertDatabaseHas('performance_indicators', [
            'id' => $indicatorChild->id,
        ]);
        $this->assertDeleted($indicatorGrandChild);
    }

    private function createIndicatorUrl($id)
    {
        return "$this->baseUrl/$id/indicators";
    }
}
