<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Question as QuestionResource;

class Quiz extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $questions = [];
        foreach($this->question as $question) {
            $questions[] = new QuestionResource($question);
        }
        return [
            'id' => $this->id,
            'name' => $this->name,
            'layout' => $this->layout,
            'questions' => $questions,
        ];
    }
}
