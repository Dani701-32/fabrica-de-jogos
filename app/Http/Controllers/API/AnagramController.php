<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Cviebrock\EloquentSluggable\Services\SlugService;
use Illuminate\Http\Request;
use Validator;
use App\Models\Anagram;
use App\Http\Resources\Anagram as AnagramResource;

class AnagramController extends BaseController
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
            'words' => 'required|array|max:12',
            'words.*' => 'required|string|max:20'
        ]);

        if($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $anagram = new Anagram();
        $anagram->name = $request->name;
        $anagram->slug = SlugService::createSlug(Anagram::class, 'slug', $request->name);
        $anagram->layout = $request->layout;
        $anagram->words = implode('/', $request->words);
        $anagram->save();

        return $this->sendResponse(new AnagramResource($anagram), "Anagram game created successfully.");
    }

    /**
     * Display the specified resource.
     *
     * @param  Anagram $anagram
     * @return \Illuminate\Http\Response
     */
    public function show(Anagram $anagram)
    {
        return $this->sendResponse(new AnagramResource($anagram), "Anagram game info retrieved successfully.");
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
