<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Models\User;
use Illuminate\Support\Str;
use App\Http\Controllers\Password as PasswordCtrl;

class PasswordResetController extends Controller {
  
    public function sendPasswordResetEmail(Request $request){
        // If email does not exist
        if(!$this->validEmail($request->email)) {
            return Response::json([
                'message' => 'Email non Valida',
                'success' => false
            ], 201);
        } else {
            // If email exists
            $token = app('App\Http\Controllers\PasswordController')->createPassword($request->email,'password');
            $response = Response::json([
                'message' => 'Controlla la tua posta! Ti abbiamo inviato un codice di 6 cifre.',
                'token' => $token,
                'success' => true
            ], 201);
            return $response;        
        }
    }

    public function validEmail($email) {
       return !!User::where('email', $email)->first();
    }

    // public function generateToken($email){
    //   $id = User::select('id')->where('email',$email)->first();
    //   PasswordCtrl::deleteExpiredRecords($id,'password');
    //   $token = Str::random(80);
    //   $psw = PasswordCtrl::sendMail($id,'password');
    //   PasswordCtrl::storeRecord($id, $psw, 'password',$token);
    //   return $token;
    // }

    public function passwordResetProcess(Request $request){
        $id = User::select('id')->where('email',$request->email)->first();
        if(PasswordCtrl::checkToken($id,'password',$request->token)){
            return PasswordCtrl::checkPsw($id,'password',$request->password)? $this->resetPassword($request) : $this->tokenNotFoundError();
        }
        return Response::json([
            'message' => 'Non autorizzato',
        ],401);
      }

      // Token not found response
      private function tokenNotFoundError() {
          return Response::json([
            'message' => 'Il Codice Inserito Non è Corretto o è Scaduto!',
            'success' => false
          ],201);
      }
      // Reset password
      private function resetPassword($request) {
          // find email
          $userData = User::whereEmail($request->email)->first();
          // update password
          $userData->update([
            'password'=>bcrypt($request->confirmPassword)
          ]);
          // reset password response
          return Response::json([
            'message' => 'Password modificata correttamente!',
            'success' => true
        ], 201);
      } 
}
