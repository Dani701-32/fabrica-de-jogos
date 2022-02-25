<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\MatchUp;
use App\Http\Resources\MatchUp as MatchUpResource;

class MatchUpController extends Controller
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
        $request->validate( [
            'name' => 'required|string|max:255',
            'layout' => 'required|integer|max:10',
            'user_id' => 'required|integer',
            'client_id' => 'required|integer',
            'origin' => 'required|string',
            'pages' => 'required|array|max:4',
            'pages.*' => 'required|array|max:4',
            'pages.*.*.word' => 'required|string',
            'pages.*.*.meaning' => 'required|string'
        ]);
        $matchup = new MatchUp();
        $matchup->name = $request->name;
        $matchup->layout = $request->layout;
        $matchup->user_id = $request->user_id;
        $matchup->client_id = $request->client_id;
        $matchup->origin = $request->origin;
        $matchup->pages = serialize($request->pages);
        $matchup->save();

        return response()->json(new MatchUpResource($matchup), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  MatchUp $matchup
     * @return JsonResponse
     */
    public function show(MatchUp $matchup): JsonResponse
    {
        return response()->json(new MatchUpResource($matchup));
    }

    public function approve(MatchUp $matchup): JsonResponse
    {
        if ($matchup->approved_at){
            return response()->json('MatchUp Game Already Approved!', 400);
        }
        $matchup->approved_at = Carbon::now();
        $matchup->save();
        return response()->json('MatchUp Game Approved Successfully!');
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
