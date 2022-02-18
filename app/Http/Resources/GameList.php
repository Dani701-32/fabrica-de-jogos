<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JetBrains\PhpStorm\ArrayShape;

class GameList extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    #[ArrayShape(['name' => "string", 'layout' => "integer", 'game_type' => "string", 'client_id' => "integer",
        'user_id' => "integer", 'origin' => "string", 'created_at' => "datetime", 'updated_at' => "datetime"])]
    public function toArray($request): array
    {
        return [
            'name' => $this->name,
            'layout' => $this->layout,
            'game_type' => $this->game_type,
            'client_id' => $this->client_id,
            'user_id' => $this->user_id,
            'origin' => $this->origin,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
