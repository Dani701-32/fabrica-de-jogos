<?php

namespace App\Http\Controllers\API;

use Cviebrock\EloquentSluggable\Services\SlugService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Validator;
use App\Models\Anagram;
use App\Http\Resources\Anagram as AnagramResource;

class AnagramController extends BaseController
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
            'words' => 'required|array|max:12',
            'words.*' => 'required|string|max:20'
        ]);

        if($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }

        $anagram = new Anagram();
        $anagram->name = $request->name;
        $anagram->slug = SlugService::createSlug(Anagram::class, 'slug', $request->name);
        $anagram->layout = $request->layout;
        $anagram->words = implode('|', $request->words);
        $anagram->save();

        return $this->sendResponse(new AnagramResource($anagram), "Anagram game created successfully.");
    }

    /**
     * Display the specified resource.
     *
     * @param  Anagram $anagram
     * @return JsonResponse
     */
    public function show(Anagram $anagram): JsonResponse
    {
        return $this->sendResponse(new AnagramResource($anagram), "Anagram game info retrieved successfully.");
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
