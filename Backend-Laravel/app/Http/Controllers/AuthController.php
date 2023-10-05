<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\User;
use App\Http\Controllers\DeviceController as DeviceCtrl;


class AuthController extends Controller
{
    //restituisce il campo first e l'id dell'utente
    public function isFirst($email){
        $isFirst = User::select('first')->where('email',$email)->first()->first;
        if($isFirst){
            return true;
        }
        return false;
    }

    //autenticazione utente
    public function authenticate(Request $request)
{
    $validator = Validator::make($request->all(), [  //email e password richieste
        'email' => 'required|email', 
        'password' => 'required',
    ]);

    if ($validator->fails()) {
        return Response::json([
            'auth' => false,
            'message' => 'Email e Password Richieste.'
        ], 202);
    } else {
        $credentials = $request->only('email', 'password');
        try {
            $user = User::select('first', 'id', 'role')->where('email',$request->email)->first(); //otteniamo i valori dei tre campi dell'utente in questione
            $token = JWTAuth::attempt($credentials);
            if ($token) {
                $message = ['auth'=>true];
                $claims = [
                    'first' => $user->first,
                    'id' => $user->id,
                    'role' => $user->role 
                ];
                $token = JWTAuth::customClaims($claims)->attempt($credentials);
                if($this->isFirst($request->email)){
                    //caso credenziali valide e primo accesso
                    app('App\Http\Controllers\DeviceController')->saveFirstDevice($request, $user->id);
                    $message['first'] = true;
                    $message['message'] = $token;
                    return Response::json($message,200);
                }else{
                    $message['first'] = false;
                }
                $uuid = $request->header('device_id');
                if(app('App\Http\Controllers\DeviceController')->checkDevice($user->id,$uuid)){
                    //caso credenziali valide, non primo accesso, ma device già registrato
                    $message['device'] = true;
                    $message['message'] = $token;
                    return Response::json($message, 200);
                }
                //caso credenziali valide, non primo accesso, device non registrato
                app('App\Http\Controllers\PasswordController')->createPassword($request->email,'device');
                $message['device'] = false;
                $message['message'] = $token;
                return Response::json($message, 200);
            } else {
                return Response::json([
                    'auth' => false,
                    'message' => 'Credenziali non valide.'
                ], 202);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
    }
}

}
