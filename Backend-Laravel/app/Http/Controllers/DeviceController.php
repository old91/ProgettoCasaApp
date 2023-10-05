<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\PasswordController as PasswordCtrl;
use App\Models\User;
use App\Models\Device;
use Illuminate\Support\Facades\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class DeviceController extends PasswordCtrl
{
    public function saveFirstDevice(Request $request, $id){
        $device = new Device;
        $device ->name = trim($request->header('device_name'));
        $device ->uuid = trim($request->header('device_id'));
        User::find($id)->devices()->save($device);
    }

    public function getDevices($id){
        $devices = User::find($id)->devices()->get();
        return $devices;
    }

    public function checkDevice($id,$uuid){
        $device = Device::where([['uuid',$uuid],['user_id',$id]])->first();
        if($device){
            return true;
        }
        return false;
    }

    public function getCodeDevice(Request $request){
        $id = $this->getId($request);
        $email = User::find($id)->first()->email;
        app('App\Http\Controllers\PasswordController')->createPassword($email,'device');
    }

    public function deleteDevice($id){
        $device = Device::find($id);
        if($device){
            $device->delete();
            return Response::json([
                'message'=>'Device rimosso con successo!',
                'success'=>true,
                'device' =>$device

            ],201);
        }
        return Response::json([
            'message'=>'Device non presente!',
            'success'=>false
        ],201);

    }

    public function saveDevice(Request $request){
        $id = $this->getId($request);
        if(PasswordCtrl::checkPsw($id,'device', $request->password)){
            $device = new Device;
            $device ->name = trim($request->deviceName);
            $device ->uuid = trim($request->deviceId);
            User::find($id)->devices()->save($device);
            return Response::json([
                'message'=>'Device registrato con successo!',
                'success'=>true
            ],201);
        }
        return Response::json([
            'message'=>'Il Codice Inserito è Errato o Scaduto!',
            'success'=>false
        ],201);

    }

    public function getId(Request $request){
        $token = substr($request->header('Authorization'),7);
        $payload = JWTAuth::setToken($token)->getPayload();
        return $payload['id'];
    }

    public function prova(){
        return 'prova';
    }
}
