<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Quiz;
use App\Http\Resources\Quiz as QuizResource;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json([''], 404);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'layout' => 'required|integer|max:10',
            'user_id' => 'required|integer',
            'client_id' => 'required|integer',
            'origin' => 'required|string',
            'questions' => 'required|array|max:10',
            'questions.*.title' => 'required|string',
            'questions.*.answers' => 'required|array|max:5',
            'questions.*.answers.*' => 'required|string|max:31',
        ]);
        $quiz = new Quiz();
        $quiz->name = $request->name;
        $quiz->layout = $request->layout;
        $quiz->user_id = $request->user_id;
        $quiz->client_id = $request->client_id;
        $quiz->origin = $request->origin;
        $quiz->questions = serialize($request->questions);
        $quiz->save();
        return response()->json(new QuizResource($quiz), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  Quiz $quiz
     * @return JsonResponse
     */
    public function show(Quiz $quiz): JsonResponse
    {
        return response()->json(new QuizResource($quiz));
    }

    public function approve(Quiz $quiz): JsonResponse
    {
        if ($quiz->approved_at) {
            return response()->json('Quiz Game Already Approved!', 400);
        }
        $quiz->approved_at = Carbon::now();
        $quiz->save();
        return response()->json('Quiz Game Approved Successfully!');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  Quiz  $quiz
     * @return JsonResponse
     */
    public function update(Request $request, Quiz $quiz): JsonResponse
    {
        if ($quiz->approved_at){
            return response()->json(["Bad request" => "Quiz Game Already Approved!"], 400);
        }
        $edited = false;
        foreach ($request->all() as $attr=>$value) {
            if (in_array($attr, array_keys($quiz->getAttributes()))) {
                $edited = true;
                if (is_array($value)) {
                    $value =  serialize($value);
                }
                $quiz->$attr = $value;
            }
        }
        if ($edited) {
            $quiz->save();
        }
        return response()->json((new QuizResource($quiz)));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Quiz $quiz
     * @return JsonResponse
     */
    public function destroy(Quiz $quiz): JsonResponse
    {
        $quiz->delete();
        return response()->json(['Success' => 'Quiz Game Deleted Successfully!']);
    }
}
