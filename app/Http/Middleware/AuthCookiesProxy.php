<?php

namespace App\Http\Middleware;

use Closure;

class AuthCookiesProxy
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $request->headers->set('Authorization', 'Bearer '.$request->cookie(config('constants.ACCESS_TOKEN_COOKIE_NAME')));

        return $next($request);
    }
}
