<?php

namespace App\Http\Controllers\API;

use Cviebrock\EloquentSluggable\Services\SlugService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Validator;
use App\Models\WordSearch;
use App\Http\Resources\WordSearch as WordSearchResource;

class WordSearchController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return $this->sendError('');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required|string|max:255',
            'layout' => 'required|integer|max:10',
            'words' => 'required|array|max:10',
            'questions.*' => 'required|string|max:18',
        ]);


        if($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $word_search = new WordSearch();
        $word_search->name = $request->name;
        $word_search->slug = SlugService::createSlug(WordSearch::class, 'slug', $request->name);
        $word_search->layout = $request->layout;
        $word_search->words = implode('|', $request->words);
        $word_search->save();
        return $this->sendResponse(new WordSearchResource($word_search), 'Word search game created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  WordSearch $wordsearch
     * @return JsonResponse
     */
    public function show(WordSearch $wordsearch): JsonResponse
    {
        return $this->sendResponse(new WordSearchResource($wordsearch), 'Word search game info retrieved successfully.');
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
        return $this->sendError('');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        return $this->sendError('');
    }
}
