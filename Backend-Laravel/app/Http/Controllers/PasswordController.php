<?php
namespace App\Http\Controllers;
use App\Models\User;
use App\Mail\ResetPasswordMail;
use App\Mail\RegisterDeviceMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Password;
use Illuminate\Support\Facades\Hash;

class PasswordController extends Controller{
    public function __construct(){}
    
    public function createPassword($email, $type){
        $id = User::select('id')->where('email',$email)->first()->id;
        $token = ($type == 'password')?Str::random(80):'null';
        $this->deleteExpiredRecords($id, $type);
        $psw = $this->sendMail($id,$type);
        $this->storeRecord($id, $psw, $type, $token);
        return $token;
    }
    
    public static function deleteExpiredRecords($id_user,$type){
        $expiredRecords = DB::table('passwords')->select('id')->where('created_at','<', date("Y-m-d H:i:s", time() - (5*60)))->get();
        foreach ($expiredRecords as $id) {
            $record = Password::find($id->id);
            $record->delete();
        }
        $isOtherRecord = User::find($id_user)->passwords()->where('type',$type)->delete();
    } 

    public static function sendMail($id,$type){
        $psw = Str::random(6);
        $user = User::select('name','surname','email')->where('id',$id)->first();
        if($type == 'password'){
            Mail::to($user->email)->send(new ResetPasswordMail($user, $psw));
        }else{
            Mail::to($user->email)->send(new RegisterDeviceMail($user, $psw));
        }
        return $psw;
    }

    public static function storeRecord($user_id, $psw, $type, $token){
        $record = new Password;
        $record->user_id = trim($user_id);
        $record->password = bcrypt($psw);
        $record->token = bcrypt($token);
        $record->type = trim($type);
        $record->save();
    }

    public function checkPsw($user_id,$type,$psw){
        $this->deleteExpiredRecords($user_id, $type);
        $record = Password::where([['user_id',$user_id],['type',$type]])->first();
        if($record){
            if(Hash::check($psw, $record->password)){
                $record->delete();
                return true;
            }
        }
        return false;
        // if(Hash::check($psw, $record->password)){
        //     $record->delete();
        //     return true;
    }

    public static function checkToken($user_id,$type,$token){
        $record = Password::where([['user_id',$user_id],['type',$type]])->first();//dasda
        if(Hash::check($token,$record->token)){
            $record->delete();
            return true;
        }
    }




}
