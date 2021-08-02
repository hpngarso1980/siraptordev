<?php

namespace Tests\Feature\Api\Account;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\User;
use Tests\TestCase;
use Tests\ApiUrls;
use Tests\ApiHelpers;

class UsersTest extends TestCase
{
    use RefreshDatabase, ApiUrls, ApiHelpers;

    protected $baseUrl = '/api/account/users';
    protected $userStructure  = [
        'id',
        'name',
        'email',
        'phone',
    ];

    public function testGetUsers()
    {
        $response = $this->apiRequest('GET', $this->baseUrl);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->userStructure,
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
            ]);
    }

    public function testCreateUser()
    {
        $user = [
            'name' => 'TestUser',
            'email' => 'testuseremail@mail.com',
            'phone' => '0811112233',
        ];
        $payload = array_merge($user, [
            'password' => 'anystring',
        ]);

        $response = $this->apiRequest('POST', $this->baseUrl, $payload);

        $response
            ->assertStatus(201)
            ->assertJson([
                'data' => $user,
            ]);
    }

    public function testUpdateUser()
    {
        $user = factory(User::class)->create();
        $id = $user->id;
        $upatedUser = [
            'name' => 'TestUser Updated',
            'email' => 'testuseremailupdated@mail.com',
            'phone' => '0811112288',
        ];
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('PATCH', $url, $upatedUser);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => $upatedUser,
            ]);
    }

    public function testDeleteUser()
    {
        $user = factory(User::class)->create();
        $id = $user->id;
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('DELETE', $url);

        $response->assertStatus(200);

        $this->assertDeleted($user);
    }
}
