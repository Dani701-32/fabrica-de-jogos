<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Anagram;
use App\Http\Resources\Anagram as AnagramResource;

class AnagramController extends Controller
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
            'words' => 'required|array|max:12',
            'words.*' => 'required|string|max:20'
        ]);

        $game = new Game();
        $game->name = $request->name;
        $game->layout = $request->layout;
        $game->user_id = $request->user_id;
        $game->client_id = $request->client_id;
        $game->origin = $request->origin;
        $game->game_type_id = 1;
        $game->save();
        $anagram = new Anagram();
        $anagram->words = serialize($request->words);
        $anagram->game_id = $game->id;
        $anagram->save();

        return response()->json(new AnagramResource($anagram), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  Anagram $anagram
     * @return JsonResponse
     */
    public function show(Anagram $anagram): JsonResponse
    {
        return response()->json(new AnagramResource($anagram));
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
