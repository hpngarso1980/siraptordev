<?php

namespace Tests\Feature\Api\Account;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Tests\ApiUrls;
use Tests\ApiHelpers;

class RolesTest extends TestCase
{
    use RefreshDatabase, ApiUrls, ApiHelpers;

    protected $baseUrl = '/api/account/roles';
    protected $roleStructure = [
        'id',
        'name',
        'permissions' => [
            '*' => [
                'id',
                'name',
            ],
        ],
    ];

    public function testGetRoles()
    {
        $response = $this->apiRequest('GET', $this->baseUrl);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->roleStructure,
                ],
            ]);
    }
}
