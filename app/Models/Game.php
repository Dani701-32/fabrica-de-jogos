<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Game extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'type', 'layout', 'client_id', 'user_id', 'origin'
    ];

    /**
     * @return BelongsTo
     */
    public function gametype(): BelongsTo
    {
        return $this->belongsTo(GameType::class);
    }

    /**
     * @return HasOne
     */
    public function quiz(): HasOne
    {
        return $this->hasOne(Quiz::class);
    }

    /**
     * @return HasOne
     */
    public function matchup(): HasOne
    {
        return $this->hasOne(MatchUp::class);
    }

    /**
     * @return HasOne
     */
    public function anagram(): HasOne
    {
        return $this->hasOne(Anagram::class);
    }

    /**
     * @return HasOne
     */
    public function trueorfalse(): HasOne
    {
        return $this->hasOne(TrueOrFalse::class);
    }

    /**
     * @return HasOne
     */
    public function wordsearch(): HasOne
    {
        return $this->hasOne(WordSearch::class);
    }

    /**
     * @return HasOne
     */
    public function memorygame(): HasOne
    {
        return $this->hasOne(MemoryGame::class);
    }

}
