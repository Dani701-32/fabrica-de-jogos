<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Validator;
use App\Models\MatchUp;
use App\Http\Resources\MatchUp as MatchUpResource;
use Cviebrock\EloquentSluggable\Services\SlugService;

class MatchUpController extends BaseController
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
            'pages' => 'required|array|max:4',
            'pages.*' => 'required|array|max:4',
            'pages.*.*.word' => 'required|string',
            'pages.*.*.meaning' => 'required|string'
        ]);

        if($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $matchup = new MatchUp();
        $matchup->name = $request->name;
        $matchup->slug = SlugService::createSlug(MatchUp::class, 'slug', $request->name);
        $matchup->layout = $request->layout;
        $matchup->pages = serialize($request->pages);
        $matchup->save();

        return $this->sendResponse(new MatchUpResource($matchup), 'MatchUp game created successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  MatchUp $matchup
     * @return JsonResponse
     */
    public function show(MatchUp $matchup): JsonResponse
    {
        return $this->sendResponse(new MatchUpResource($matchup), 'game info retrieved successfully');
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
