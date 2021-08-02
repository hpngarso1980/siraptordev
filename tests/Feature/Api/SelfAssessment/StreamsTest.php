<?php

namespace Tests\Feature\Api\SelfAssessment;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\SelfAssessmentStream;
use Tests\TestCase;
use Tests\ApiHelpers;

class StreamsTest extends TestCase
{
    use RefreshDatabase, ApiHelpers;

    protected $baseUrl = '/api/self-assessment/streams';
    protected $streamStructure  = [
        'id',
        'name',
        'score_target',
        'created_at',
        'updated_at',
    ];

    public function testGetStreams()
    {
        $stream = factory(SelfAssessmentStream::class)->create();
        $url = $this->baseUrl;
        $response = $this->apiRequest('GET', $url);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->streamStructure,
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
                        'id' => $stream->id,
                    ]
                ]
            ]);
    }

    public function testGetAllStreams()
    {
        $stream = factory(SelfAssessmentStream::class)->create();
        $url = "$this->baseUrl?all=true";
        $response = $this->apiRequest('GET', $url);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                    ],
                ],
            ])
            ->assertJson([
                'data' => [
                    [
                        'id' => $stream->id,
                    ]
                ]
            ]);
    }

    public function testGetSingleStream()
    {
        $stream = factory(SelfAssessmentStream::class)->create();
        $url = "$this->baseUrl/$stream->id";

        $response = $this->apiRequest('GET', $url);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => $this->streamStructure,
            ])
            ->assertJson([
                'data' => [
                    'id' => $stream->id,
                ],
            ]);
    }

    public function testCreateStream()
    {
        $stream = [
            'name' => 'TestStream',
            'score_target' => 4,
        ];

        $response = $this->apiRequest('POST', $this->baseUrl, $stream);

        $response
            ->assertStatus(201)
            ->assertJson([
                'data' => [
                    'name' => $stream['name'],
                    'score_target' => $stream['score_target'],
                ],
            ]);
    }

    public function testUpdateStream()
    {
        $stream = factory(SelfAssessmentStream::class)->create();
        $id = $stream->id;
        $upatedStream = [
            'name' => 'TestStream Updated',
            'score_target' => 1,
        ];
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('PATCH', $url, $upatedStream);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'name' => $upatedStream['name'],
                    'score_target' => $upatedStream['score_target'],
                ],
            ]);
    }

    public function testDeleteStream()
    {
        $stream = factory(SelfAssessmentStream::class)->create();
        $id = $stream->id;
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('DELETE', $url);

        $response->assertStatus(200);

        $this->assertDeleted($stream);
    }
}
