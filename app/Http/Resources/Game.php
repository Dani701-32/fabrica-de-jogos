<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JetBrains\PhpStorm\ArrayShape;
use JsonSerializable;
use Storage;

class Game extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array|Arrayable|JsonSerializable
     */
    #[ArrayShape(['slug' => 'string', 'name' => "string", 'layout' => "int", 'category' => "string", 'options' => "array", 'images' => 'array', 'approved_at' => "datetime", 'created_at' => "datetime", 'updated_at' => "datetime"])]
    public function toArray($request): array|JsonSerializable|Arrayable
    {
        if ($this->gameCategory->id === 9) {
            $images = $this->images;
            $temp_urls = [];
            foreach($images as $image) {
                $temp_urls[] = Storage::disk('s3')->temporaryUrl($image->path.$image->name, now()->addMinutes(30));
            }
        }
        return [
            'slug' => $this->slug,
            'name' => $this->name,
            'layout' => $this->layout,
            'category' => $this->gameCategory->name,
            'options' => $temp_urls ?? unserialize($this->options, [false]),
            'approved_at' => $this->approved_at,
            'created_at' => $this->created_at->format('d/m/Y H:i:s'),
            'updated_at' => $this->updated_at->format('d/m/Y H:i:s'),
        ];
    }
}
