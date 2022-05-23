<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\GameCategory;
use App\Models\Image;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\Game as GameResource;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Storage;

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
     * @param GameCategory $gameCategory
     * @param Request $request
     * @return JsonResponse
     */
    public function store(GameCategory $gameCategory, Request $request): JsonResponse
    {
        $validationOptions = array_merge([
            'name' => 'required|string|max:255',
            'layout' => 'required|int|max:8'
        ], unserialize($gameCategory->creation_rules, [false]));
        $validatedData = $request->validate($validationOptions);
        $game = new Game();
        $game->name = $validatedData['name'];
        $game->layout = $validatedData['layout'];
        $game->game_category_id = $gameCategory->id;

        $images = $request->file('options');
        $game->options = !$images ? serialize($validatedData['options']): '';
        $game->save();
        if ($gameCategory->id === 9) {
            $index = 0;
            foreach ($images as $image) {
                $path = "storage/memorygame/";
                $fileName = $game->slug ."_". $index . "." . $image->getClientOriginalExtension();
                Storage::disk('s3')->putFileAs($path, $image, $fileName);
                $imageObj = new Image();
                $imageObj->path = $path;
                $imageObj->name = $fileName;
                $imageObj->game_id = $game->id;
                $imageObj->save();
                $index++;
            }
        }
        return response()->json(new GameResource($game));
    }

    /**
     * Display the specified game.
     *
     * @param GameCategory $gameCategory
     * @param Game $game
     * @return JsonResponse
     */
    public function show(GameCategory $gameCategory, Game $game): JsonResponse
    {
        return response()->json(new GameResource($game));
    }

    /**
     * Approve the specified game.
     *
     * @param GameCategory $gameCategory
     * @param Game $game
     * @return JsonResponse
     */
    public function approve(GameCategory $gameCategory, Game $game): JsonResponse
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
     * @param GameCategory $gameCategory
     * @param Request $request
     * @param Game $game
     * @return JsonResponse
     */
    public function update(GameCategory $gameCategory, Request $request, Game $game): JsonResponse
    {
        if ($game->approved_at){
            return response()->json(["Bad request" => "Anagram Game Already Approved!"], 400);
        }
        $validationOptions = array_merge([
            'name' => 'string|max:255',
            'layout' => 'int|max:8'
        ], unserialize($gameCategory->update_rules, [false]));
        $validatedData = $request->validate($validationOptions);
        $edited = false;
        foreach ($validatedData as $attr=>$value) {
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
     * @param GameCategory $gameCategory
     * @param Game $game
     * @return JsonResponse
     */
    public function destroy(GameCategory $gameCategory, Game $game): JsonResponse
    {
        $game->delete();
        return response()->json(['Success' => 'Game Deleted Successfully!']);
    }
}
