<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\RecoverPassword;
use Illuminate\Support\Facades\Hash;


class ChangePasswordController extends Controller {
  public function __construct(){
    $this->middleware('jwt.auth', ['except' => ['index', 'show']]);
  }

    public function passwordResetProcess(Request $request){
      return $this->updatePasswordRow($request) ? $this->resetPassword($request) : $this->tokenNotFoundError();
    }
    // Verify if token is valid
    private function updatePasswordRow($request){
      $record = RecoverPassword::where('email', $request->email)->first();
      if(Hash::check($request->resetPassword,$record->password)){
        return $record;
      }
    }
    // Token not found response
    private function tokenNotFoundError() {
        return Response::json([
          'message' => 'Il Codice Inserito Non è Corretto!',
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
        // remove verification data from db
        $this->updatePasswordRow($request)->delete();
        // reset password response
        return Response::json([
          'message' => 'Password modificata correttamente!',
          'success' => true
      ], 201);
    }    
}