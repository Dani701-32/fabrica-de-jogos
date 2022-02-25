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
    #[ArrayShape(['name' => "string", 'slug' => "string", 'layout' => "int", 'words' => "string[]", 'approved_at' => "datetime", 'created_at' => "datetime", 'updated_at' => "datetime"])]
    public function toArray($request): array
    {
        return [
            'slug' => $this->slug,
            'name' => $this->name,
            'layout' => $this->layout,
            'words' => unserialize($this->words),
            'approved_at' => $this->approved_at,
            'created_at' => $this->created_at->format('d/m/Y H:i:s'),
            'updated_at' => $this->updated_at->format('d/m/Y H:i:s'),
        ];
    }
}
