<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use JetBrains\PhpStorm\ArrayShape;

class TrueOrFalse extends Model
{
    use HasFactory;
    use Sluggable;

    protected $fillable = [
        'name', 'layout', 'questions', 'answers'
    ];

    #[ArrayShape(['slug' => "string[]"])]
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
