<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Tests\ApiUrls;
use Tests\ApiHelpers;

class UsersTest extends TestCase
{
    use RefreshDatabase, ApiUrls, ApiHelpers;

    public function testGetAssigneeOptions()
    {
        $response = $this->apiRequest('GET', $this->apiUrls['assigneeOptions']);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                    ],
                ],
            ]);
    }
}
