<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Mail\PasswordEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AdminController extends Controller
{   
    public function __construct(){
        $this->middleware('jwt.auth');
    }
    //recuperiamo tutti gli utenti
    public function getAll(){
        $users = User::all();
        return $users;
    }

    //cambiamo il ruolo dell'utente
    public function changeRole($id){
        $user = User::find($id);
        if ($validator->fails()) {
            $message = ['errors' => $validator->messages()->all()];
            $response = Response::json($message, 202);
        } else {
            if(!$user){
                return Response::json([
                    'message' => "Cannot find the user."
                ], 404);
            }
        }
        $role = ($user->role == 'vendor') ? $user->role = 'admin' : $user->role = 'vendor';
        $user->role = $role;
        $user->save();
        $message = 'Your user has been updated successfully';
            $response = Response::json([
                'message' => $message,
                'data' => $user,
            ], 201);
            return $response;
    }
    //invia email con password provvisoria
    public function sendMail($user){
        $name = $user -> name;
        $surname = $user-> surname;
        $password = $user-> password;
        $email = $user->email;

        Mail::to($email)->send(new PasswordEmail($name,$surname,$password));
    }

    //crea un nuovo utente
    public function storeUser(Request $request)
    {
        if ((!$request->email) || (!$request->name) || (!$request->surname) || (!$request->role)) {
            $response = Response::json([
                'message' => 'Please enter all required fields'
            ], 422);
             return $response;
        }
        $user = User::where('email',$request->email)->first();
        if ($user){
            $response = Response::json([
                'message' => "L'email inserita appartiene già ad un account",
                'success' => false
            ], 200);
            return $response;
        }
        $request->password = Str::random(6);
        $newUser = new User(array(
            'email' => trim($request->email),
            'name' => trim($request->name),
            'surname'=> trim($request->surname),
            'role'=> trim($request->role),
            'ref_user' =>strtoupper(substr($request->name,0,1)).strtoupper(substr($request->surname,0,1)),
            'password' => bcrypt($request->password),
        ));
        $newUser->save();
        $this->sendMail($request);
        if($newUser->id<10){
            $newUser->ref_user = $newUser->ref_user.'0'.$newUser->id;
        }else{
            $newUser->ref_user = $newUser->ref_user.$newUser->id;
        }
        $newUser->save();
        
        $message = "L'Utente è stato creato con successo";
        $response = Response::json([
            'message' => $message,
            'data' => $newUser,
        ], 201);
        return $response;
        
    }
    //cancelliamo utente
    public function deleteUser($id){
        $user = User::find($id);
        if(!$user){
            return Response::json([
                'message' => "Cannot find the user."
            ], 404);
        }
        $user->delete();
        $message = 'The user has been deleted successfully';
        $response = Response::json([
            'message' => $message,
            'data' => $user,
            'success' => true
        ], 200);
        return $response;

    }

}
