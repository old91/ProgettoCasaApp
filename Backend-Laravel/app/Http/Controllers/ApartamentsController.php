<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ApartamentDraft;
use App\Models\Apartament;
use Illuminate\Support\Facades\Response;

class ApartamentsController extends Controller
{
    public function __construct(){
        $this->middleware('jwt.auth', ['except' => ['getAll']]);
    }
    //recuperiamo gli appartamenti di uno specifico utente
    public function getApartamentsUser($ref_user){
        $user = User::with('apartaments')->where('ref_user',$ref_user)->first();
        $apartaments = $user ? $user->apartaments : null;
        return $apartaments;
    }

    //recuperiamo le bozze degli appartamenti
    public function getApartamentDrafts(){
        $apartamentDrafts = ApartamentDraft::All();
        return $apartamentDrafts;
    }
    //salviamo appartamento
    public function storeApartament(Request $request){
        $array = $request->all();
        $apartament = new Apartament($array);
        $apartament->save();
        $message = 'Appartamento Creato con Successo';
        $response = Response::json([
            'message' => $message,
            'data' => $apartament,
            'success' =>true
        ], 201);
        return $response;
    }
    //salviamo appartamento bozza
    public function storeApartamentDraft(Request $request){
        $array = $request->all();
        $apartament = new ApartamentDraft($array);
        $apartament->save();
        $message = 'Bozza Creata con Successo';
        $response = Response::json([
            'message' => $message,
            'data' => $apartament,
            'success' =>true
        ], 201);
        return $response;
    }
    //cancelliamo bozza
    public function deleteDraft($id){
        $draft = ApartamentDraft::find($id);
        if(!$draft){
            return Response::json([
                'message' => "Cannot find the apartament."
            ], 404);
        }
        $draft->delete();
        $message = "The apartament's draft has been deleted successfully";
        $response = Response::json([
            'message' => $message,
            'data' => $draft,
            'success' => true
        ], 200);
        return $response;

    }

    //recuperiamo tutti gli appartamenti
    public function getAll(){
        $apartaments = Apartament::all();
        return $apartaments;
    }

    //cancelliamo appartamento da id
    public function deleteApartament($id){
        $apart = Apartament::find($id);
        if(!$apart){
            return Response::json([
                'message' => "Cannot find the apartament."
            ], 404);
        }
        $apart->delete();
        $message = "The apartament has been deleted successfully";
        $response = Response::json([
            'message' => $message,
            'data' => $apart,
            'success' => true
        ], 200);
        return $response;
    }
    //recuperiamo appartamento dall'id
    public function getApartament($id)
    {
        $apartament = Apartament::find($id);
        if(!$apartament){
            return Response::json([
                'error'=>[
                    'message'=>"Cannot find the apartament."
                ]
                ],404);
        }
        return Response::json($apartament,200);
    }

    //modificiamo Bozza
    public function editDraft(Request $request, $id){
        $draft = ApartamentDraft::find($id);
        if(!$draft){ //possibile che non sia necessario
            return Response::json([
                'message' => 'Bozza non Trovata, riprovare più tardi!',
                'success' => false
            ], 404);
        }
        $input = $request->all();
        $draft->fill($input)->save();
        return Response::json([
            'message' => 'Bozza Modificata con Successo!',
            'success' => true
        ], 200);
    }

    //modificiamo Appartamento
    public function editApartament(Request $request, $id){
        $apart = Apartament::find($id);
        if(!$apart){ //possibile che non sia necessario
            return Response::json([
                'message' => 'Appartamento non Trovato, riprovare più tardi!',
                'success' => false
            ], 404);
        }
        $input = $request->all();
        $apart->fill($input)->save();
        return Response::json([
            'message' => 'Appartamento Modificato con Successo!',
            'success' => true
        ], 200);
    }

}
