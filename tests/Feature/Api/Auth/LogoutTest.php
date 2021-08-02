<?php

namespace Tests\Feature\Api\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Tests\ApiUrls;
use Tests\ApiHelpers;

class LogoutTest extends TestCase
{
    use RefreshDatabase, ApiUrls, ApiHelpers;

    private $logoutUrl;

    public function setUp(): void
    {
        parent::setUp();

        $this->logoutUrl = $this->apiUrls['logout'];
    }

    public function testLogoutSuccess()
    {
        $accessToken = $this->getAccessToken();

        $response = $this->postJsonWithCookies($this->logoutUrl, [], [
            'access_token' => $accessToken,
        ]);

        $response
            ->assertStatus(200)
            ->assertCookieExpired('refresh_token')
            ->assertCookieExpired('access_token')
            ->assertJsonStructure([
                'message',
            ]);
    }

    public function testLogoutWithoutAccessToken()
    {
        $response = $this->postJson($this->logoutUrl);

        $this->assertUnauthorized($response);
    }

    public function testLogoutUsingInvalidAccessToken()
    {
        $response = $this->postJson($this->logoutUrl, [], [
            'authorization' => 'Bearer invalidtoken',
        ]);

        $this->assertUnauthorized($response);
    }
}
