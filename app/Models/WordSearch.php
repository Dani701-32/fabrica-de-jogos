<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use JetBrains\PhpStorm\ArrayShape;

/**
 * @property string $name
 * @property int $layout
 * @property int $user_id
 * @property int $client_id
 * @property string $origin
 * @property array|string $words
 */
class WordSearch extends Model
{
    use HasFactory;
    use Sluggable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'type', 'layout', 'client_id', 'user_id', 'origin', 'words'
    ];

    #[ArrayShape(['slug' => "string[]"])]
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => ['name']
            ]
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
