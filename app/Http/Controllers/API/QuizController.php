<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Models\Quiz;
use App\Http\Resources\Quiz as QuizResource;
use App\Models\Question;
use Cviebrock\EloquentSluggable\Services\SlugService;

class QuizController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required|string|max:255',
            'layout' => 'required|integer|max:10',
            'questions' => 'required|array|max:10',
            'questions.*.title' => 'required|string|max:80',
            'questions.*.answers' => 'required|array|max:5',
            'questions.*.answers.*' => 'required|string|max:31',
        ]);


        if($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $quiz = new Quiz();
        $quiz->name = $request->name;
        $quiz->slug = SlugService::createSlug(Quiz::class, 'slug', $request->name);
        $quiz->layout = $request->layout;
        $quiz->save();
        $questions = $request->questions;
        foreach($questions as $question) {
            $model = new Question();
            foreach($question as $key => $value) {
                if (is_array($value)) {
                    $value = implode('/', $value);
                }
                $model->$key = $value;
            }
            $model->quiz_id = $quiz->id;
            $model->save();
        }
        return $this->sendResponse(new QuizResource($quiz), 'Quiz game created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  Quiz $quiz
     * @return \Illuminate\Http\Response
     */
    public function show(Quiz $quiz)
    {
        return $this->sendResponse(new QuizResource($quiz), 'Quiz game information retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Quiz  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Quiz $quiz)
    {
        $input = $request->all();
        $edited = false;
        foreach ($input as $attr=>$value) {
            if (in_array($attr, array_keys($quiz->getAttributes()))) {
                $edited = true;
                $quiz->$attr = $value;
            }
        }
        if ($edited) {
            $quiz->save();
            return $this->sendResponse(new QuizResource($quiz), 'Quiz game information updated successfully.');
        }
        return $this->sendError("Bad request", "Invalid request", 400);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
