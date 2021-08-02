<?php

namespace App\Services;

use App\Repositories\UserRepository;
use App\Services\OAuthService;

class AuthService
{
    private $oauthService;
    private $userRepository;

    public function __construct(OAuthService $oauthService, UserRepository $userRepository)
    {
        $this->oauthService = $oauthService;
        $this->userRepository = $userRepository;
    }

    public function login($email, $password)
    {
        $user = $this->userRepository->findByEmail($email);

        if (!$user) {
            return [
                'result' => [
                    'email' => ['akun tidak ditemukan.'],
                ],
                'code' => 422,
            ];
        }

        $accessToken = $this->oauthService->grantAccessToken($email, $password);

        if ($accessToken) {
            return [
                'result' => $accessToken,
                'code' => 200,
            ];
        } else {
            return [
                'result' => [
                    'password' => ['password salah.'],
                ],
                'code' => 422,
            ];
        }
    }

    public function refresh($refreshToken)
    {
        $accessToken = $this->oauthService->refreshAccessToken($refreshToken);

        if ($accessToken) {
            return [
                'result' => $accessToken,
                'code' => 200,
            ];
        } else {
            return [
                'code' => 401,
            ];
        }
    }

    public function logout($user)
    {
        $accessToken = $user->token();

        $this->oauthService->revokeRefreshToken($accessToken->id);

        $accessToken->revoke();
    }
}
