<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JetBrains\PhpStorm\ArrayShape;

class Anagram extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    #[ArrayShape(['name' => "string", 'slug' => "string", 'layout' => "int", 'words' => "string[]", 'created_at' => "datetime", 'updated_at' => "datetime"])]
    public function toArray($request): array
    {
        return [
            'name' =>  $this->name,
            'slug' => $this->slug,
            'layout' => $this->layout,
            'words' => explode('|', $this->words),
            'created_at' => $this->created_at->format('d/m/Y'),
            'updated_at' => $this->updated_at->format('d/m/Y'),
        ];
    }
}
