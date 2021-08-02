<?php

namespace Tests;

use App\Models\User;
use Arr;
use Artisan;
use DB;
use Hash;
use AuthorizationTableSeeder;

use Tests\ApiUrls;

trait ApiHelpers
{
    use ApiUrls;

    protected function apiRequest($method, $url, $data = [], $accessToken = NULL)
    {
        $accessToken = $accessToken === NULL ? $this->getAccessToken() : $accessToken;
        $data = $data ? $data : [];

        return $this->call($method, $url, $data, [
            'access_token' => $accessToken,
        ]);
    }

    protected function getAccessToken($email = 'superadmintest@mail.com', $password = 'password')
    {
        $response = $this->login($email, $password);

        $cookies = $response->headers->getCookies();

        $accessTokenCookie = Arr::first($cookies, function ($cookie) {
            return $cookie->getName() === 'access_token';
        });

        return $accessTokenCookie ? $accessTokenCookie->getValue() : NULL;
    }

    protected function login($email = 'superadmintest@mail.com', $password = 'password')
    {
        $this->seed(AuthorizationTableSeeder::class);

        $client = DB::table('oauth_clients')
            ->where('password_client', true)
            ->first();

        if (!$client) {
            Artisan::call('passport:install');
        }

        $user = User::where('email', $email)->first();

        if (!$user) {
            $user = factory(User::class)->create([
                'email' => $email,
                'password' => Hash::make($password),
            ]);
            $user->syncPermissions(array_values(config('policies.permissions')));
        }

        $response = $this->postJson($this->apiUrls['login'], [
            'email' => $email,
            'password' => $password,
        ]);

        return $response;
    }

    protected function postJsonWithCookies($url, $data, $cookies = [])
    {
        return $this->call('POST', $url, $data, $cookies);
    }

    protected function assertUnauthorized($response)
    {
        $response
            ->assertStatus(401)
            ->assertJson([
                'errors' => [
                    'Sesi telah berakhir. Tolong login kembali.',
                ],
            ]);
    }
}
