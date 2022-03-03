<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\MemoryGame;
use Carbon\Carbon;
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
            'name' => 'required|string|max:255',
            'layout' => 'required|integer|max:10',
            'user_id' => 'required|integer',
            'client_id' => 'required|integer',
            'origin' => 'required|string',
            'images' => 'required|max:6|min:2',
            'images.*' => 'mimes:jpeg,jpg,png'
        ]);


        $files = $request->file('images');
        $images = [];
        foreach ($files as $file) {
            $path = $file->store('images', "public");
            $images[] = $path;
        }
        $memory = new MemoryGame();
        $memory->name = $request->name;
        $memory->layout = $request->layout;
        $memory->user_id = $request->user_id;
        $memory->client_id = $request->client_id;
        $memory->origin = $request->origin;
        $memory->images = serialize($images);
        switch (sizeof($files)) {
            case 2:
                $memory->grid = serialize([2, 2]);
                break;
            case 3:
                $memory->grid = serialize([3, 2]);
                break;
            case 4:
                $memory->grid = serialize([4, 2]);
                break;
            case 5:
                $memory->grid = serialize([5, 2]);
                break;
            case 6:
                $memory->grid = serialize([4, 3]);
                break;
        }
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

    public function approve(MemoryGame $memorygame): JsonResponse
    {
        if ($memorygame->approved_at) {
            return response()->json('Memory Game Already Approved!', 400);
        }
        $memorygame->approved_at = Carbon::now();
        $memorygame->save();
        return response()->json('Memory Game Approved Successfully!');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param MemoryGame $memorygame
     * @return JsonResponse
     */
    public function update(Request $request, MemoryGame $memorygame): JsonResponse
    {
        if ($memorygame->approved_at){
            return response()->json(["Bad request" => "Memory Game Already Approved!"], 400);
        }
        $edited = false;
        foreach ($request->all() as $attr=>$value) {
            if (in_array($attr, array_keys($memorygame->getAttributes()))) {
                $edited = true;
                if (is_array($value)) {
                    $value =  serialize($value);
                }
                $memorygame->$attr = $value;
            }
        }
        if ($edited) {
            $memorygame->save();
        }
        return response()->json((new MemoryGameResource($memorygame)));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param MemoryGame $memorygame
     * @return JsonResponse
     */
    public function destroy(MemoryGame $memorygame): JsonResponse
    {
        $memorygame->delete();
        return response()->json(['Success' => 'Memory Game Deleted Successfully!']);
    }
}
