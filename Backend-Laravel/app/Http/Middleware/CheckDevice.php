<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Response;
use App\Models\Device;
use App\Mail\AccessEmail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class CheckDevice
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
        $uuid = $request->header('device_id');
        $device = Device::where([['uuid',$uuid],['user_id',$id]])->first();
        if($device){
            return $next($request);
        }
        $invalidate = JWTAuth::setToken($token)->invalidate(true);
        $device_name = $request->header('device_name');
        $this->sendMail($id, $device_name);
        return Response::json([
            'message'=> $device_name

        ]);

        return $next($request);


       //controllare sezione appartamenti
       //controllare gestione errori(opzionale)
       //trovare modo per pubblicarlo
        
    }

    public function sendMail($id, $device){
        $user = User::where([['id',$id]])->first();
        $name = $user -> name;
        $surname = $user-> surname;
        $email = $user->email;
        Mail::to($email)->send(new AccessEmail($name,$surname,$device));
    }
}