<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\WordSearch;
use App\Http\Resources\WordSearch as WordSearchResource;

class WordSearchController extends Controller
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
            'words' => 'required|array|max:10',
            'words.*.word' => 'required|string|max:10',
            'words.*.tip' => 'required|string|max:50'
        ]);
        $word_search = new WordSearch();
        $word_search->name = $request->name;
        $word_search->layout = $request->layout;
        $word_search->words = serialize($request->words);
        $word_search->save();
        return response()->json(new WordSearchResource($word_search), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  WordSearch $wordsearch
     * @return JsonResponse
     */
    public function show(WordSearch $wordsearch): JsonResponse
    {
        return response()->json(new WordSearchResource($wordsearch));
    }

    public function approve(WordSearch $wordsearch): JsonResponse
    {
        if ($wordsearch->approved_at) {
            return response()->json('Word Search Game Already Approved!', 400);
        }
        $wordsearch->approved_at = Carbon::now();
        $wordsearch->save();
        return response()->json('Word Search Game Approved Successfully');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param WordSearch $wordsearch
     * @return JsonResponse
     */
    public function update(Request $request, WordSearch $wordsearch): JsonResponse
    {
        if ($wordsearch->approved_at){
            return response()->json(["Bad request" => "Word Search Game Already Approved!"], 400);
        }
        $edited = false;
        foreach ($request->all() as $attr=>$value) {
            if (in_array($attr, array_keys($wordsearch->getAttributes()))) {
                $edited = true;
                if (is_array($value)) {
                    $value =  serialize($value);
                }
                $wordsearch->$attr = $value;
            }
        }
        if ($edited) {
            $wordsearch->save();
        }
        return response()->json((new WordSearchResource($wordsearch)));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param WordSearch $wordsearch
     * @return JsonResponse
     */
    public function destroy(WordSearch $wordsearch): JsonResponse
    {
        $wordsearch->delete();
        return response()->json(['Success' => 'Word Search Game Deleted Successfully!']);
    }
}
