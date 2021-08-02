<?php

namespace Tests\Feature\Api\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;
use Tests\ApiUrls;

use App\Repositories\UserRepository;
use App\Services\OAuthService;
use App\Models\User;
use Artisan;
use Hash;

class LoginTest extends TestCase
{
    use RefreshDatabase, ApiUrls;

    private $loginUrl;
    private $password;
    private $user;

    public function setUp(): void
    {
        parent::setUp();

        Artisan::call('passport:install');

        $this->loginUrl = $this->apiUrls['login'];
        $this->password = 'password';
        $this->user = factory(User::class)->create([
            'password' => Hash::make($this->password),
        ]);
    }

    public function testLoginSuccess()
    {
        $response = $this->postJson($this->loginUrl, [
            'email' => $this->user->email,
            'password' => $this->password,
        ]);

        $response
            ->assertStatus(200)
            ->assertCookieNotExpired('refresh_token')
            ->assertCookieNotExpired('access_token')
            ->assertJsonStructure([
                'message',
            ]);
    }

    public function testMissingEmailInput()
    {
        $response = $this->postJson($this->loginUrl, [
            'password' => $this->user->password,
        ]);

        $response
            ->assertStatus(422)
            ->assertJson([
                'errors' => [
                    'email' => ['email wajib diisi.'],
                ],
            ]);
    }

    public function testMissingPasswordInput()
    {
        $response = $this->postJson($this->loginUrl, [
            'email' => $this->user->email,
        ]);

        $response
            ->assertStatus(422)
            ->assertJson([
                'errors' => [
                    'password' => ['password wajib diisi.'],
                ],
            ]);
    }

    public function testUnavailableUser()
    {
        $response = $this->postJson($this->loginUrl, [
            'email' => 'unknownuser@unknonwmail.com',
            'password' => 'randompassword',
        ]);

        $response
            ->assertStatus(422)
            ->assertJson([
                'errors' => [
                    'email' => ['akun tidak ditemukan.'],
                ],
            ]);
    }

    public function testInvalidPassword()
    {
        $response = $this->postJson($this->loginUrl, [
            'email' => $this->user->email,
            'password' => 'randompassword',
        ]);

        $response
            ->assertStatus(422)
            ->assertJson([
                'errors' => [
                    'password' => ['password salah.'],
                ],
            ]);
    }
}
