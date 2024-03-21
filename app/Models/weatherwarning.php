<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class weatherwarning extends Model
{
    use HasFactory;


protected  $table = 'weatherwarnings' ;

    protected $fillable =  [
        'contact',
        'email',
        'options',
    ];




}
