<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGameTypeRequest;
use App\Http\Requests\UpdateGameTypeRequest;
use App\Models\GameType;

class GameTypeController extends Controller
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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreGameTypeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreGameTypeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GameType  $gameType
     * @return \Illuminate\Http\Response
     */
    public function show(GameType $gameType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GameType  $gameType
     * @return \Illuminate\Http\Response
     */
    public function edit(GameType $gameType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateGameTypeRequest  $request
     * @param  \App\Models\GameType  $gameType
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateGameTypeRequest $request, GameType $gameType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GameType  $gameType
     * @return \Illuminate\Http\Response
     */
    public function destroy(GameType $gameType)
    {
        //
    }
}
