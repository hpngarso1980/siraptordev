<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\AuthService;

use Auth;

class AuthController extends Controller
{
    private $authService,
            $accessTokensExpirationMinutes,
            $refreshTokensExpirationMinutes,
            $accessTokenCookieName,
            $refreshTokensCookieName;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;

        $this->accessTokenCookieName = config('constants.ACCESS_TOKEN_COOKIE_NAME');
        $this->refreshTokenCookieName = config('constants.REFRESH_TOKEN_COOKIE_NAME');
        $this->accessTokensExpirationMinutes = config('constants.ACCESS_TOKEN_EXPIRATION_MINUTES');
        $this->refreshTokensExpirationMinutes = config('constants.REFRESH_TOKEN_EXPIRATION_MINUTES');
    }

    public function login()
    {
        $rules = [
            'email' => 'required',
            'password' => 'required',
        ];

        return $this->validateThenProceed(function() {
            $login = $this->authService->login(request('email'), request('password'));

            if ($login['code'] === 200) {
                return $this->respondWithAuthorizeSuccess($login);
            } else {
                return $this->respondWithFieldErrors($login['result']);
            }
        }, $rules);
    }

    public function refresh()
    {
        $refreshToken = request()->cookie($this->refreshTokenCookieName);

        $refresh = $this->authService->refresh($refreshToken);

        if ($refresh['code'] === 200) {
            return $this->respondWithAuthorizeSuccess($refresh);
        } else {
            return $this->respondWithUnauthorized();
        }
    }

    public function logout()
    {
        $user = Auth::user();

        $this->authService->logout($user);

        return $this->respondWithLogoutSuccess();
    }

    public function unauthorized()
    {
        return $this->respondWithUnauthorized();
    }

    private function respondWithAuthorizeSuccess($result)
    {
        return response()
            ->json([
                'message' => 'Selamat datang',
            ])
            ->cookie($this->refreshTokenCookieName, $result['result']->refresh_token, $this->refreshTokensExpirationMinutes, null, null, false, true)
            ->cookie($this->accessTokenCookieName, $result['result']->access_token,$this->accessTokensExpirationMinutes, null, null, false, true);
    }

    private function respondWithLogoutSuccess()
    {
        return response()
            ->json([
                'message' => 'Sampai jumpa!',
            ])
            ->cookie($this->refreshTokenCookieName, null, 0, null, null, false, true)
            ->cookie($this->accessTokenCookieName, null, 0, null, null, false, true);
    }
}
