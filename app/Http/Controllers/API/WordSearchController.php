<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Cviebrock\EloquentSluggable\Services\SlugService;
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
            'questions.*' => 'required|string|max:18',
        ]);

        $word_search = new WordSearch();
        $word_search->name = $request->name;
        $word_search->slug = SlugService::createSlug(WordSearch::class, 'slug', $request->name);
        $word_search->layout = $request->layout;
        $word_search->words = implode('|', $request->words);
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

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        return response()->json([''], 404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        return response()->json([''], 404);
    }
}
