<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\MemoryGame;
use Illuminate\Http\Request;
use App\Http\Resources\MemoryGame as MemoryGameResource;

class MemoryGameController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'images' => 'required|max:6|min:2',
            'images.*' => 'mimes:jpeg,jpg,png,gif,csv,txt,pdf|max:2048'
        ]);

        if(!$request->hasFile('images')) {
            return $this->sendError(['upload_file_not_found'], 400);
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(MemoryGame $memorygame)
    {
        return $this->sendResponse(new MemoryGameResource($memorygame), 'Memory game information retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
