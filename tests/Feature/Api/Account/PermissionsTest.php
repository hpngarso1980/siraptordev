<?php

namespace Tests\Feature\Api\Account;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Tests\ApiUrls;
use Tests\ApiHelpers;

class PermissionsTest extends TestCase
{
    use RefreshDatabase, ApiUrls, ApiHelpers;

    protected $baseUrl = '/api/account/permissions';
    protected $permissionStructure = [
        'id',
        'name',
    ];

    public function testGetPermissions()
    {
        $response = $this->apiRequest('GET', $this->baseUrl);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->permissionStructure,
                ],
            ]);
    }
}
