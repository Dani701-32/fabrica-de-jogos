<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Cviebrock\EloquentSluggable\Services\SlugService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Cruzadinha;
use App\Http\Resources\Cruzadinha as CruzadinhaResource;

class CruzadinhaController extends Controller
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
            'words' => 'required|array|max:8',
            'words.*' => 'required|string:max:10',
            'tips' => 'required|array|max:8',
            'tips.*' => 'required|string',
        ]);

        $cruzadinha = new Cruzadinha();
        $cruzadinha->name = $request->name;
        $cruzadinha->slug = SlugService::createSlug(Cruzadinha::class, 'slug', $request->name);
        $cruzadinha->layout = $request->layout;
        $cruzadinha->words = implode('|', $request->words);
        $cruzadinha->tips = implode('|', $request->tips);
        $cruzadinha->image_tips = $request->image_tips;
        $cruzadinha->save();

        return response()->json(new CruzadinhaResource($cruzadinha), 201);
    }
    /**
     * Display the specified resource.
     *
     * @param  Cruzadinha  $cruzadinha
     * @return JsonResponse
     */
    public function show(Cruzadinha $cruzadinha): JsonResponse
    {
        return response()->json(new CruzadinhaResource($cruzadinha));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  Cruzadinha $cruzadinha
     * @return JsonResponse
     */
    public function update(Request $request, Cruzadinha $cruzadinha): JsonResponse
    {
        $input = $request->all();
        $edited = false;
        foreach ($input as $attr=>$value) {
            if (in_array($attr, array_keys($cruzadinha->getAttributes()))) {
                $edited = true;
                if (is_array($value)) {
                    $value = implode('/', $value);
                }
                $cruzadinha->$attr = $value;
            }
        }
        if ($edited) {
            $cruzadinha->save();

            return response()->json(new CruzadinhaResource($cruzadinha));
        }
        return response()->json(["Bad request" => "Invalid request"],400);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        return response()->json([''], 404);
    }
}
