<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use JetBrains\PhpStorm\ArrayShape;

class Cruzadinha extends Model
{
    use HasFactory;
    use Sluggable;

    protected $fillable = [
      'name', 'layout', 'words', 'tips'
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
