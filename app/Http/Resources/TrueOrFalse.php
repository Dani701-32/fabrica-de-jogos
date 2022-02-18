<?php

namespace App\Http\Resources;

use App\Http\Resources\Game as GameResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JetBrains\PhpStorm\ArrayShape;

class TrueOrFalse extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    #[ArrayShape(['slug' => "string", 'name' => "string", 'layout' => "int", 'questions' => "array", 'created_at' => "datetime", 'updated_at' => "datetime"])]
    public function toArray($request): array
    {
        $game = new GameResource($this->game);
        return [
            'slug' => $this->slug,
            'name' => $game->name,
            'layout' => $game->layout,
            'questions' => unserialize($this->questions),
            'created_at' => $this->created_at->format('d/m/Y'),
            'updated_at' => $this->updated_at->format('d/m/Y'),
        ];
    }
}
