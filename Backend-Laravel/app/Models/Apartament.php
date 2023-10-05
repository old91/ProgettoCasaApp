<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apartament extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'agent',
        'date',
        'city',
        'macro',
        'micro',
        'type',
        'renovate',
        'floor',
        'floors',
        'apartaments',
        'fees',
        'year',
        'locals',
        'bedrooms',
        'bathrooms',
        'surface',
        'balcony',
        'terrace',
        'garage',
        'parking',
        'cellar',
        'garden',
        'price',
        'estimate',
        'images',
        'description'
    ];
}
