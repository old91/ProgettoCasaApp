<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


// Route::resource('users', UserController::class);

//authcontroller
Route::post('login', 'App\Http\Controllers\AuthController@authenticate');
Route::get('isfirst', 'App\Http\Controllers\AuthController@isFirst')->middleware('device');


//userscontroller
Route::get('user/{id}', 'App\Http\Controllers\UsersController@getUser')->middleware('device');
Route::patch('change-psw/{id}', 'App\Http\Controllers\UsersController@updatePsw')->middleware('device');
Route::patch('change-email/{id}', 'App\Http\Controllers\UsersController@updateEmail')->middleware('device');

//admincontroller
Route::get('users', 'App\Http\Controllers\AdminController@getAll')->middleware('device','admin');
Route::patch('change-role/{id}', 'App\Http\Controllers\AdminController@changeRole')->middleware('device','admin');
Route::post('create-user', 'App\Http\Controllers\AdminController@storeUser')->middleware('device','admin');
Route::delete('delete-user/{id}', 'App\Http\Controllers\AdminController@deleteUser')->middleware('device','admin');

//apartamentscontroller
Route::get('apartaments-user/{ref_user}', 'App\Http\Controllers\ApartamentsController@getApartamentsUser')->middleware('device');
Route::get('apartament-drafts', 'App\Http\Controllers\ApartamentsController@getApartamentDrafts')->middleware('device');
Route::post('create-draft', 'App\Http\Controllers\ApartamentsController@storeApartamentDraft')->middleware('device');
Route::delete('delete-draft/{id}', 'App\Http\Controllers\ApartamentsController@deleteDraft')->middleware('device');
Route::post('create-apart', 'App\Http\Controllers\ApartamentsController@storeApartament')->middleware('device');
Route::get('apartaments', 'App\Http\Controllers\ApartamentsController@getAll');
Route::delete('delete-apart/{id}', 'App\Http\Controllers\ApartamentsController@deleteApartament')->middleware('device');
Route::get('apartament/{id}', 'App\Http\Controllers\ApartamentsController@getApartament')->middleware('device');
Route::patch('edit-draft/{id}', 'App\Http\Controllers\ApartamentsController@editDraft')->middleware('device');
Route::patch('edit-apart/{id}', 'App\Http\Controllers\ApartamentsController@editApartament')->middleware('device');

//resetpassword
Route::post('request-reset','App\Http\Controllers\PasswordResetController@sendPasswordResetEmail')->middleware('device');
Route::patch('password-reset','App\Http\Controllers\PasswordResetController@passwordResetProcess')->middleware('device');

//deviceController
Route::post('save-device','App\Http\Controllers\DeviceController@saveDevice');
Route::post('request-device','App\Http\Controllers\DeviceController@getCodeDevice');
Route::get('devices/{id}','App\Http\Controllers\DeviceController@getDevices')->middleware('device');
Route::delete('delete-device/{id}','App\Http\Controllers\DeviceController@deleteDevice')->middleware('device');





