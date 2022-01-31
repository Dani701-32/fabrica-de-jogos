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
            'images' => 'required',
            'images.*' => 'mimes:jpeg,jpg,png,gif,csv,txt,pdf|max:2048'
        ]);

        if(!$request->hasFile('images')) {
            return $this->sendError(['upload_file_not_found'], 400);
        }

        $files = $request->file('images');
        $images = [];
        foreach ($files as $file) {
            $path = $file->store('public/images');
            $images[] = $path;
        }
        $memory = new MemoryGame();
        $memory->name = $request->name;
        $memory->layout = $request->layout;
        $memory->images = serialize($images);
        $memory->save();
        return $this->sendResponse(new MemoryGameResource($memory), 'Memory game information retrieved successfully.');
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
