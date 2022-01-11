<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Cviebrock\EloquentSluggable\Services\SlugService;
use Illuminate\Http\Request;
use Validator;
use App\Models\TrueOrFalse;
use App\Http\Resources\TrueOrFalse as TrueOrFalseResource;

class TrueOrFalseController extends BaseController
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
            'questions' => 'required|array|max:10',
            'questions.*' => 'required|string|max:240',
            'answers' => 'required|array|max:10',
            'answers.*' => 'required|boolean'
        ]);

        if($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $true_or_false = new TrueOrFalse();
        $true_or_false->name = $request->name;
        $true_or_false->slug = SlugService::createSlug(TrueOrFalse::class, 'slug', $request->name);
        $true_or_false->layout = $request->layout;
        $true_or_false->questions = implode('|', $request->questions);
        $answers = $request->answers;
        for($x = 0; $x < sizeof($answers); $x++) {
            $answers[$x] = $answers[$x] ? 'true' : 'false';
        }
        $true_or_false->answers = implode('|', $answers);
        $true_or_false->save();

        return $this->sendResponse(new TrueOrFalseResource($true_or_false), "True or false game created successfully.");
    }

    /**
     * Display the specified resource.
     *
     * @param  TrueOrFalse $trueorfalse
     * @return \Illuminate\Http\Response
     */
    public function show(TrueOrFalse $trueorfalse)
    {
        return $this->sendResponse(new TrueOrFalseResource($trueorfalse), "True or false game info retrieved successfully.");
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
