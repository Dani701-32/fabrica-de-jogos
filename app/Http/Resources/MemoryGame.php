<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JetBrains\PhpStorm\ArrayShape;
use App\Models\Image;
use Storage;

class MemoryGame extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    #[ArrayShape(['slug' => "string", 'name' => "string", 'layout' => "int", 'images' => "string[]", 'grid' => "int[]", 'approved_at' => "datetime", 'created_at' => "datetime", 'updated_at' => "datetime"])]
    public function toArray($request): array
    {
        $images = Image::all()->where('memory_game_id', $this->id);
        $temp_urls = [];
        foreach($images as $image){
            $temp_urls[] = Storage::disk('s3')->temporaryUrl($this->path."/".$image->name, now()->addMinutes(10));
        }
        return [
            'slug' => $this->slug,
            'name' => $this->name,
            'layout' => $this->layout,
            'images' => $temp_urls,
            'grid' => unserialize($this->grid),
            'approved_at' => $this->approved_at,
            'created_at' => $this->created_at->format('d/m/Y H:i:s'),
            'updated_at' => $this->updated_at->format('d/m/Y H:i:s'),
        ];
    }
}
