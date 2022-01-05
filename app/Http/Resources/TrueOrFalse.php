<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TrueOrFalse extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        $questions = explode('/', $this->questions);
        $answers = explode('/', $this->answers);
        $full_response = array();
        for ($x = 0; $x < sizeof($questions); $x++) {
            $full_response[$questions[$x]] = $answers[$x] == 'true';
        }
        return [
            'name' => $this->name,
            'layout' => $this->layout,
            'questions' => $full_response
        ];
    }
}
