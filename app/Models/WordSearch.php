<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WordSearch extends Model
{
    use HasFactory;


    protected $fillable = [
      'name', 'layout', 'words'
    ];
}
