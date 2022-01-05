<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MatchUp extends Model
{
    use HasFactory;

    protected $fillable = [
        "name", "words", "meanings"
    ];
}
