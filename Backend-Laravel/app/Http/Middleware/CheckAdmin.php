<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Response;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $token= str_replace('Bearer ', "" , $request->header('Authorization'));
        $payload = JWTAuth::setToken($token)->getPayload();
        $id = $payload('id');
        $role = User::where([['id',$id]])->first()->role;
        if($role == 'admin'){
            return $next($request);
        }
        return Response::json([
            'message'=> "L'utente non ha i requisiti necessari.",
            'role' => $role

        ],500);

    }
}
