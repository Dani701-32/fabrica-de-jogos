<?php

namespace App\Http\Controllers\API;

use Cviebrock\EloquentSluggable\Services\SlugService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Validator;
use App\Models\TrueOrFalse;
use App\Http\Resources\TrueOrFalse as TrueOrFalseResource;

class TrueOrFalseController extends BaseController
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
            'questions' => 'required|array|max:10',
            'questions.*.title' => 'required|string|max:240',
            'questions.*.answer' => 'required|boolean'
        ]);

        if($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $true_or_false = new TrueOrFalse();
        $true_or_false->name = $request->name;
        $true_or_false->slug = SlugService::createSlug(TrueOrFalse::class, 'slug', $request->name);
        $true_or_false->layout = $request->layout;
        $true_or_false->questions = serialize($request->questions);
        $true_or_false->save();

        return $this->sendResponse(new TrueOrFalseResource($true_or_false), "True or false game created successfully.");
    }

    /**
     * Display the specified resource.
     *
     * @param  TrueOrFalse $trueorfalse
     * @return JsonResponse
     */
    public function show(TrueOrFalse $trueorfalse): JsonResponse
    {
        return $this->sendResponse(new TrueOrFalseResource($trueorfalse), "True or false game info retrieved successfully.");
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
