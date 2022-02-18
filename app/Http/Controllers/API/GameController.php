<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGameRequest;
use App\Http\Requests\UpdateGameRequest;
use App\Models\Game;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\GameList as GameResource;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param int|null $user_id
     * @return JsonResponse
     */
    public function index(int $user_id = null): JsonResponse
    {
        if ($user_id) {
            $games = Game::all()->where('user_id', $user_id);
        }
        else {
            $games = Game::all();
        }
        return response()->json(GameResource::collection($games));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param StoreGameRequest $request
     * @return JsonResponse
     */
    public function store(StoreGameRequest $request): JsonResponse
    {
        return response()->json([''], 404);
    }

    /**
     * Display the specified resource.
     *
     * @param Game $game
     * @return JsonResponse
     */
    public function show(Game $game): JsonResponse
    {
        return response()->json([''], 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateGameRequest $request
     * @param Game $game
     * @return JsonResponse
     */
    public function update(UpdateGameRequest $request, Game $game): JsonResponse
    {
        return response()->json([''], 404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Game $game
     * @return JsonResponse
     */
    public function destroy(Game $game): JsonResponse
    {
        return response()->json([''], 404);
    }
}
