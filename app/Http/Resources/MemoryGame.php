<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JetBrains\PhpStorm\ArrayShape;
use App\Http\Resources\Game as GameResource;

class MemoryGame extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    #[ArrayShape(['slug' => "string", 'name' => "string", 'layout' => "int", 'images' => "string[]", 'grid' => "int[]", 'created_at' => "datetime", 'updated_at' => "datetime"])]
    public function toArray($request): array
    {
        $game = new GameResource($this->game);
        return [
            'slug' => $this->slug,
            'name' => $game->name,
            'layout' => $game->layout,
            'images' => unserialize($this->images),
            'grid' => unserialize($this->grid),
            'created_at' => $this->created_at->format('d/m/Y'),
            'updated_at' => $this->updated_at->format('d/m/Y'),
        ];
    }
}
