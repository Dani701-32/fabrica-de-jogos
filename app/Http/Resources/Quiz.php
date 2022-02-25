<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JetBrains\PhpStorm\ArrayShape;

class Quiz extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    #[ArrayShape(['slug' => "string", 'name' => "string", 'layout' => "int", 'questions' => "array", 'approved_at' => "date", 'created_at' => "datetime", 'updated_at' => "datetime"])]
    public function toArray($request): array
    {
        return [
            'slug' => $this->slug,
            'name' => $this->name,
            'layout' => $this->layout,
            'questions' => unserialize($this->questions),
            'approved_at' => $this->approved_at,
            'created_at' => $this->created_at->format('d/m/Y H:i:s'),
            'updated_at' => $this->updated_at->format('d/m/Y H:i:s'),
        ];
    }
}
