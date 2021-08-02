<?php

namespace App\Services;

use Illuminate\Http\Request;
use DB;

class OAuthService
{
    private $client;

    public function __construct()
    {
        $this->client = DB::table('oauth_clients')
          ->where('password_client', true)
          ->first();
    }

    public function grantAccessToken($email, $password)
    {
        $response = $this->sendRequest('password', [
            'username' => $email,
            'password' => $password,
        ]);

        if ($response->status() === 200) {
            return json_decode($response->content());
        } else {
            return false;
        }
    }

    public function refreshAccessToken($refreshToken)
    {
        $response = $this->sendRequest('refresh_token', [
            'refresh_token' => $refreshToken,
        ]);

        if ($response->status() === 200) {
            return json_decode($response->content());
        } else {
            return false;
        }
    }

    public function revokeRefreshToken($accessTokenId)
    {
        return DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessTokenId)
            ->update([
                'revoked' => true,
            ]);
    }

    private function sendRequest($grantType, $params)
    {
        $data = array_merge($params, [
            'grant_type' => $grantType,
            'client_id' => $this->client->id,
            'client_secret' => $this->client->secret,
        ]);

        $request = Request::create('/oauth/token', 'POST', $data);

        $response = app()->handle($request);

        return $response;
    }
}
