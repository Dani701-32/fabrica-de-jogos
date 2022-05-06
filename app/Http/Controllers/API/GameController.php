<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\GameCategory;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\Game as GameResource;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class GameController extends Controller
{
    /**
     * Display a listing of the games.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json([''], 404);
    }

    /**
     * Store a newly created game in database.
     *
     * @param GameCategory $gamecategory
     * @param Request $request
     * @return JsonResponse
     */
    public function store(GameCategory $gamecategory, Request $request): JsonResponse
    {
        $name = $request->get('name');
        $layout = $request->get('layout');
        $options = serialize($request->get('options'));
        $gameCategory_id = $gamecategory->id;
        $game = new Game();
        $game->name = $name;
        $game->layout = $layout;
        $game->options = $options;
        $game->game_category_id = $gameCategory_id;
        $game->save();
        return response()->json(new GameResource($game));
    }

    /**
     * Display the specified game.
     *
     * @param GameCategory $gamecategory
     * @param Game $game
     * @return JsonResponse
     */
    public function show(GameCategory $gamecategory, Game $game): JsonResponse
    {
        return response()->json(new GameResource($game));
    }

    /**
     * Approve the specified game.
     *
     * @param GameCategory $gamecategory
     * @param Game $game
     * @return JsonResponse
     */
    public function approve(GameCategory $gamecategory, Game $game): JsonResponse
    {
        if ($game->approved_at){
            return response()->json(["Bad request" => "Game Already Approved!"], 400);
        }
        $game->approved_at = Carbon::now();
        return response()->json(["Success" => "Game Approved!"]);
    }

    /**
     * Update the specified resource in database.
     *
     * @param GameCategory $gamecategory
     * @param Request $request
     * @param Game $game
     * @return JsonResponse
     */
    public function update(GameCategory $gamecategory, Request $request, Game $game): JsonResponse
    {
        if ($game->approved_at){
            return response()->json(["Bad request" => "Anagram Game Already Approved!"], 400);
        }
        $edited = false;
        foreach ($request->all() as $attr=>$value) {
            if (array_key_exists($attr, $game->getAttributes())) {
                $edited = true;
                if (is_array($value)) {
                    $value =  serialize($value);
                }
                $game->$attr = $value;
            }
        }
        if ($edited) {
            $game->save();
        }
        return response()->json((new GameResource($game)));
    }

    /**
     * Remove the specified game from database.
     *
     * @param GameCategory $gamecategory
     * @param Game $game
     * @return JsonResponse
     */
    public function destroy(GameCategory $gamecategory, Game $game): JsonResponse
    {
        $game->delete();
        return response()->json(['Success' => 'Game Deleted Successfully!']);
    }
}
