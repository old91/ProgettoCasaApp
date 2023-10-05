<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
// use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject as AuthenticatableUserContract;


class User extends Authenticatable implements AuthenticatableUserContract
{
    use HasFactory, Notifiable;

    //relationship one to many
    public function apartaments(){
        return $this->hasMany(Apartament::class,'agent','ref_user');
    }

    public function passwords(){ 
        return $this->hasMany('App\Models\Password');
    }
    public function devices(){ 
        return $this->hasMany('App\Models\Device');
    }
    // public function code(){ 
    //     return $this->hasone('App\Models\Code');
    // }


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'surname',
        'role',
        'email',
        'password',
        'ref_user',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }
}
