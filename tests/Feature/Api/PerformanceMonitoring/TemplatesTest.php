<?php

namespace Tests\Feature\Api\PerformanceMonitoring;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\PerformanceTemplate;
use Tests\TestCase;
use Tests\ApiHelpers;

class TemplatesTest extends TestCase
{
    use RefreshDatabase, ApiHelpers;

    protected $baseUrl = '/api/performance-monitoring/templates';
    protected $templateStructure  = [
        'id',
        'name',
        'created_at',
        'updated_at',
    ];

    public function testGetTemplates()
    {
        $template = factory(PerformanceTemplate::class)->create();
        $response = $this->apiRequest('GET', $this->baseUrl);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->templateStructure,
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
                        'id' => $template->id,
                    ],
                ],
            ]);
    }

    public function testGetSingleTemplate()
    {
        $template = factory(PerformanceTemplate::class)->create();
        $url = "$this->baseUrl/$template->id";

        $response = $this->apiRequest('GET', $url);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => $this->templateStructure,
            ])
            ->assertJson([
                'data' => [
                    'id' => $template->id,
                ],
            ]);
    }

    public function testCreateTemplate()
    {
        $template = [
            'name' => 'TestTemplate',
        ];

        $response = $this->apiRequest('POST', $this->baseUrl, $template);

        $response
            ->assertStatus(201)
            ->assertJson([
                'data' => $template,
            ]);
    }

    public function testUpdateTemplate()
    {
        $template = factory(PerformanceTemplate::class)->create();
        $id = $template->id;
        $upatedTemplate = [
            'name' => 'TestTemplate Updated',
        ];
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('PATCH', $url, $upatedTemplate);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => $upatedTemplate,
            ]);
    }

    public function testDeleteTemplate()
    {
        $template = factory(PerformanceTemplate::class)->create();
        $id = $template->id;
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('DELETE', $url);

        $response->assertStatus(200);

        $this->assertDeleted($template);
    }
}
