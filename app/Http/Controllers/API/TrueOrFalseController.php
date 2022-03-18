<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\TrueOrFalse;
use App\Http\Resources\TrueOrFalse as TrueOrFalseResource;

class TrueOrFalseController extends Controller
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
            'questions' => 'required|array|max:10',
            'questions.*.title' => 'required|string',
            'questions.*.answer' => 'required|boolean'
        ]);
        $true_or_false = new TrueOrFalse();
        $true_or_false->name = $request->name;
        $true_or_false->layout = $request->layout;
        $true_or_false->questions = serialize($request->questions);
        $true_or_false->save();

        return response()->json(new TrueOrFalseResource($true_or_false), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  TrueOrFalse $trueorfalse
     * @return JsonResponse
     */
    public function show(TrueOrFalse $trueorfalse): JsonResponse
    {
        return response()->json(new TrueOrFalseResource($trueorfalse));
    }

    public function approve(TrueOrFalse $trueorfalse): JsonResponse
    {
        if ($trueorfalse->approve_at) {
            return response()->json('True or False Game Already Approved!', 400);
        }
        $trueorfalse->approved_at = Carbon::now();
        $trueorfalse->save();
        return response()->json('True or False Game Approved successfully!');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param TrueOrFalse $trueorfalse
     * @return JsonResponse
     */
    public function update(Request $request, TrueOrFalse $trueorfalse): JsonResponse
    {
        if ($trueorfalse->approved_at){
            return response()->json(["Bad request" => "True Or False Game Already Approved!"], 400);
        }
        $edited = false;
        foreach ($request->all() as $attr=>$value) {
            if (in_array($attr, array_keys($trueorfalse->getAttributes()))) {
                $edited = true;
                if (is_array($value)) {
                    $value =  serialize($value);
                }
                $trueorfalse->$attr = $value;
            }
        }
        if ($edited) {
            $trueorfalse->save();
        }
        return response()->json((new TrueOrFalseResource($trueorfalse)));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param TrueOrFalse $trueorfalse
     * @return JsonResponse
     */
    public function destroy(TrueOrFalse $trueorfalse): JsonResponse
    {
        $trueorfalse->delete();
        return response()->json(['Success' => 'True or False Game Deleted Successfully!']);
    }
}
