<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\MemoryGame;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Resources\MemoryGame as MemoryGameResource;

class MemoryGameController extends Controller
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
            'images' => 'required|max:6|min:2',
            'images.*' => 'mimes:jpeg,jpg,png'
        ]);


        $files = $request->file('images');
        $images = [];
        foreach ($files as $file) {
            $path = $file->store('images', "public");
            $images[] = $path;
        }
        $game = new Game();
        $game->name = $request->name;
        $game->layout = $request->layout;
        $game->user_id = $request->user_id;
        $game->client_id = $request->client_id;
        $game->origin = $request->origin;
        $game->game_type_id = 3;
        $game->save();
        $memory = new MemoryGame();
        $memory->images = serialize($images);
        switch (sizeof($files)) {
            case 2:
                $memory->grid = serialize([2, 2]);
                break;
            case 3:
                $memory->grid = serialize([2, 3]);
                break;
            case 4:
                $memory->grid = serialize([2, 4]);
                break;
            case 5:
                $memory->grid = serialize([2, 5]);
                break;
            case 6:
                $memory->grid = serialize([3, 4]);
                break;
        }
        $memory->game_id = $game->id;
        $memory->save();
        return response()->json(new MemoryGameResource($memory), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  MemoryGame $memorygame
     * @return JsonResponse
     */
    public function show(MemoryGame $memorygame): JsonResponse
    {
        return response()->json(new MemoryGameResource($memorygame));
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
