<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{   

    // public function __construct(){
    //     $this->middleware('jwt.auth');
    // }
    
    //ottieni un utente dall'id
    public function getUser($id){
        $user = User::find($id);
        if(!$user){
            return Response::json([
                'error'=>[
                    'message'=>"Cannot find the user."
                ]
                ],404);
        }
        return Response::json($user,200);
    }
    //cambio password dall'id
    public function updatePsw(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'password' => 'required'
        ]);
        if ($validator->fails()) {
            $message = ['errors' => $validator->messages()->all()];
            $response = Response::json($message, 202);
        } else {
            $user = User::find($id);
            if(!$user){
                return Response::json([
                    'message' => "Cannot find the user."
                ], 404);
            }
        }
        $user->password= bcrypt($request->password);
        $user->first = 0;
        $user->save();
        $message = 'Your user has been updated successfully';
            $response = Response::json([
                'message' => $message,
                'data' => $user,
            ], 201);
            return $response;
    }
    public function updateEmail(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
        ]);
        if ($validator->fails()) {
            $message = ['errors' => $validator->messages()->all()];
            $response = Response::json($message, 202);
        } else {
            $user = User::find($id);
            if(!$user){
                return Response::json([
                    'message' => "Cannot find the user."
                ], 404);
            }
        }
        $user->email = $request->email;
        $user->save();
        $message = 'Your user has been updated successfully';
            $response = Response::json([
                'message' => $message,
                'data' => $user,
            ], 201);
            return $response;
    }
    
}
