<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $slug
 * @property array|string $update_rules
 * @property array|string $creation_rules
 */
class GameCategory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'slug', 'description'
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function games(): HasMany
    {
        return $this->hasMany(Game::class);
    }
}
