<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Models\WordSearch;
use App\Http\Resources\WordSearch as WordSearchResource;

class WordSearchController extends BaseController
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
            'words' => 'required|array|max:10',
            'questions.*' => 'required|string|max:18',
        ]);


        if($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $word_search = new WordSearch();
        $word_search->name = $request->name;
        $word_search->layout = $request->layout;
        $word_search->words = implode('/', $request->words);
        $word_search->save();
        return $this->sendResponse(new WordSearchResource($word_search), 'Word search game created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  WordSearch $wordsearch
     * @return \Illuminate\Http\Response
     */
    public function show(WordSearch $wordsearch)
    {
        return $this->sendResponse(new WordSearchResource($wordsearch), 'Word search game info retrieved successfully.');
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
