<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Cviebrock\EloquentSluggable\Sluggable;
use JetBrains\PhpStorm\ArrayShape;

/**
 * @property string $name
 * @property int $layout
 * @property int $user_id
 * @property int $client_id
 * @property string $origin
 * @property array|string $images
 * @property array|string $grid
 * @property string $slug
 */
class MemoryGame extends Model
{
    use HasFactory;
    use SoftDeletes;
    use Sluggable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'type', 'layout', 'client_id', 'user_id', 'origin', 'grid'
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

    public function images(): HasMany
    {
        return $this->hasMany('images');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
