<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Epic;
use Tests\TestCase;
use Tests\ApiHelpers;

class EpicTest extends TestCase
{
    use RefreshDatabase, ApiHelpers;

    protected $baseUrl = '/api/epics';
    protected $epicStructure = [
        'id',
        'title',
        'start_date',
        'end_date',
        'state',
        'created_at',
        'updated_at',
        'finished_at',
    ];

    public function testGetEpic()
    {
        $epic = factory(Epic::class)->create();

        $response = $this->apiRequest('GET', $this->baseUrl);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->epicStructure,
                ],
            ])
            ->assertJson([
                'data' => [
                    [
                        'title' => $epic->title,
                        'start_date' => $epic->start_date,
                        'end_date' => $epic->end_date,
                        'state' => $epic->state
                    ],
                ],
            ]);
    }

    public function testUpdateEpic()
    {
        $epic = factory(Epic::class)->create();
        $id = $epic->id;
        $upatedData = [
            'title' => 'Epic Updated',
            'start_date' => '2020-01-01',
            'end_date' => '2020-02-01',
        ];
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('PATCH', $url, $upatedData);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'title' => $upatedData['title'],
                    'start_date' => $upatedData['start_date'],
                    'end_date' => $upatedData['end_date'],
                ],
            ]);
    }
}
