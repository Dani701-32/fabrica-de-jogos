<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Models\MatchUp;
use App\Http\Resources\MatchUp as MatchUpResource;

class MatchUpController extends BaseController
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
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required|string|max:255',
            'layout' => 'required|integer|max:10',
            'words' => 'required|array|max:4',
            'words.*' => 'required|string|max:26',
            'meanings' => 'required|array|max:4',
            'meanings.*' => 'required|string|max:80'
        ]);

        if($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $matchup = new MatchUp();
        $matchup->name = $request->name;
        $matchup->layout = $request->layout;
        $matchup->words = implode("/", $request->words);
        $matchup->meanings = implode("/", $request->meanings);
        $matchup->save();

        return $this->sendResponse(new MatchUpResource($matchup), 'MatchUp game created successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  MatchUp $matchup
     * @return \Illuminate\Http\Response
     */
    public function show(MatchUp $matchup)
    {
        return $this->sendResponse(new MatchUpResource($matchup), 'game info retrieved successfully');
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
