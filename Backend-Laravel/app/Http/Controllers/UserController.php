<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Response;
use App\Mail\PasswordEmail;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return $users;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function sendMail($user){
        $name = $user -> name;
        $surname = $user-> surname;
        $password = $user-> password;
        $email = $user->email;

        Mail::to($email)->send(new PasswordEmail($name,$surname,$password));
    }
    public function store(Request $request)
    {
        if ((!$request->email) || (!$request->name) || (!$request->surname) || (!$request->password) || (!$request->role)) {
            $response = Response::json([
                'message' => 'Please enter all required fields'
            ], 422);
             return $response;
        }
        $user = new User(array(
            'email' => trim($request->email),
            'name' => trim($request->name),
            'surname'=> trim($request->surname),
            'role'=> trim($request->role),
            'password' => bcrypt($request->password),
        ));
        $this->sendMail($request);
        $user->save();
        $message = 'The user has been created successfully';
        $response = Response::json([
            'message' => $message,
            'data' => $user,
        ], 201);
        return $response;
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
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

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if ((!$request->name) || (!$request->email) || (!$request->password)) {
            $response = Response::json([
                'message' => 'Please enter all required fields'
            ], 422);
            return $response;
        }
        $user = User::find($id);
        if(!$user){
            return Response::json([
                'message' => "Cannot find the user."
            ], 404);
        }
        $user->name = trim($request->name);
        $user->surname = trim($request->surname);
        $user->role = trim($request->role);
        $user->first = trim($request->first);
        $user->email = trim($request->email);   
        $user->password= bcrypt($request->password);
        $user->save();
        $message = 'Your user has been updated successfully';
        $response = Response::json([
            'message' => $message,
            'data' => $user,
        ], 201);
        return $response;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    // public function __construct(){
    //     $this->middleware('jwt.auth');
    // }
}
