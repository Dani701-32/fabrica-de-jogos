<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\MemoryGame;
use Illuminate\Http\Request;

class MemoryGameController extends Controller
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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'images' => 'required',
            'images.*' => 'image',
            'name' => 'required|string',
            'layout' => 'required'
        ]);

        $files = [];
        if ($request->hasFile('images')) {
            $files = $request->file('images');
            foreach ($files as $file) {
                $name = time() . rand(1, 100) . '.' . $file->extension();
                $file->move(public_path('files') . '/memorygame/', $name);
                $files[] = $name;
            }
        }
        $memory = new MemoryGame();
        $memory->name = $request->name;
        $memory->layout = $request->layout;
        $memory->images = serialize($files);
        $memory->save();
        return($request->file('images'));

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
