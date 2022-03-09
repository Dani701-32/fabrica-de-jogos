<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Anagram;
use App\Http\Resources\Anagram as AnagramResource;
use Carbon\Carbon;

class AnagramController extends Controller
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
            'words' => 'required|array|max:12',
            'words.*' => 'required|string|max:20'
        ]);


        $anagram = new Anagram();
        $anagram->name = $request->name;
        $anagram->layout = $request->layout;
        $anagram->words = serialize($request->words);
        $anagram->save();

        return response()->json(new AnagramResource($anagram), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  Anagram $anagram
     * @return JsonResponse
     */
    public function show(Anagram $anagram): JsonResponse
    {
        return response()->json(new AnagramResource($anagram));
    }

    public function approve(Anagram $anagram): JsonResponse
    {
        if ($anagram->approved_at){
            return response()->json('Anagram Game Already Approved!', 400);
        }
        $anagram->approved_at = Carbon::now();
        $anagram->save();
        return response()->json('Anagram Game Approved successfully!');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Anagram $anagram
     * @return JsonResponse
     */
    public function update(Request $request, Anagram $anagram): JsonResponse
    {
        if ($anagram->approved_at){
            return response()->json(["Bad request" => "Anagram Game Already Approved!"], 400);
        }
        $edited = false;
        foreach ($request->all() as $attr=>$value) {
            if (in_array($attr, array_keys($anagram->getAttributes()))) {
                $edited = true;
                if (is_array($value)) {
                    $value =  serialize($value);
                }
                $anagram->$attr = $value;
            }
        }
        if ($edited) {
            $anagram->save();
        }
        return response()->json((new AnagramResource($anagram)));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Anagram $anagram
     * @return JsonResponse
     */
    public function destroy(Anagram $anagram): JsonResponse
    {
        $anagram->delete();
        return response()->json(['Success' => 'Anagram Game Deleted Successfully!']);
    }
}
