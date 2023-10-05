<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApartamentDraft extends Model
{
    use HasFactory;
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
        'celllar',
        'garden',
        'price',
        'estimate',
        'images',
        'description'
    ];
}
