<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use JetBrains\PhpStorm\ArrayShape;

/**
 * @method static create(array $array)
 * @property  $approved_at
 * @property mixed $name
 */
class Game extends Model
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
        'name', 'layout', 'options'
    ];

    #[ArrayShape(['slug' => "string[]"])]
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => ['name', 'category.name']
            ]
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function gameCategory(): BelongsTo
    {
        return $this->belongsTo(GameCategory::class);
    }

    public function images(): hasMany
    {
        return $this->hasMany(Image::class);
    }
}
