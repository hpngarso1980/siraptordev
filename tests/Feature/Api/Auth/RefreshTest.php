<?php

namespace Tests\Feature\Api\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Tests\ApiUrls;
use Tests\ApiHelpers;

use Arr;

class RefreshTest extends TestCase
{
    use RefreshDatabase, ApiUrls, ApiHelpers;

    private $refreshUrl;

    public function setUp(): void
    {
        parent::setUp();

        $this->refreshUrl = $this->apiUrls['refresh'];
    }

    public function testRefreshSuccess()
    {
        $loginResponse = $this->login();

        $cookies = $loginResponse->headers->getCookies();
        $accessToken = Arr::first($cookies, function ($cookie) {
            return $cookie->getName() === 'access_token';
        })->getValue();
        $refreshToken = Arr::first($cookies, function ($cookie) {
            return $cookie->getName() === 'refresh_token';
        })->getValue();


        $response = $this->postJsonWithCookies($this->refreshUrl, [], [
            'refresh_token' => $refreshToken,
        ]);

        $response
            ->assertStatus(200)
            ->assertCookieNotExpired('refresh_token')
            ->assertCookieNotExpired('access_token')
            ->assertJsonStructure([]);

        $newCookies = $response->headers->getCookies();
        $newAccessToken = Arr::first($newCookies, function ($cookie) {
            return $cookie->getName() === 'access_token';
        })->getValue();
        $newRefreshToken = Arr::first($newCookies, function ($cookie) {
            return $cookie->getName() === 'refresh_token';
        })->getValue();

        $this->assertNotEquals($newAccessToken, $accessToken);
        $this->assertNotEquals($newRefreshToken, $refreshToken);
    }

    public function testRefreshWithoutRefreshToken()
    {
        $this->login();

        $response = $this->postJsonWithCookies($this->refreshUrl, []);

        $this->assertUnauthorized($response);
    }

    public function testRefreshUsingInvalidRefreshToken()
    {
        $this->login();

        $response = $this->postJsonWithCookies($this->refreshUrl, [
            'refresh_token' => 'invalidrefreshtoken',
        ]);

        $this->assertUnauthorized($response);
    }
}
