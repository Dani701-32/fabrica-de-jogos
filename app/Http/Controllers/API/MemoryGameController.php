<?php

namespace App\Http\Controllers\API;

use App\Models\MemoryGame;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Resources\MemoryGame as MemoryGameResource;

class MemoryGameController extends BaseController
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
        $request->validate([
            'images' => 'required|max:6|min:2',
            'images.*' => 'mimes:jpeg,jpg,png'
        ]);

        if(!$request->hasFile('images')) {
            return $this->sendError('Bad Request', ['Upload image not found!'], 400);
        }

        $files = $request->file('images');
        $images = [];
        foreach ($files as $file) {
            $path = $file->store('images', "public");
            $images[] = $path;
        }
        $memory = new MemoryGame();
        $memory->name = $request->name;
        $memory->layout = $request->layout;
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
        $memory->save();
        return $this->sendResponse(new MemoryGameResource($memory), 'Memory game created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  MemoryGame $memorygame
     * @return JsonResponse
     */
    public function show(MemoryGame $memorygame): JsonResponse
    {
        return $this->sendResponse(new MemoryGameResource($memorygame), 'Memory game information retrieved successfully.');
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
