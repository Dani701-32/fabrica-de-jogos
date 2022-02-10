<?php

namespace App\Http\Controllers\API;

use Cviebrock\EloquentSluggable\Services\SlugService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Cruzadinha;
use App\Http\Resources\Cruzadinha as CruzadinhaResource;
use Validator;

class CruzadinhaController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return $this->sendError('');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required|string|max:255',
            'layout' => 'required|integer|max:10',
            'words' => 'required|array|max:8',
            'words.*' => 'required|string:max:10',
            'tips' => 'required|array|max:8',
            'tips.*' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $cruzadinha = new Cruzadinha();
        $cruzadinha->name = $request->name;
        $cruzadinha->slug = SlugService::createSlug(Cruzadinha::class, 'slug', $request->name);
        $cruzadinha->layout = $request->layout;
        $cruzadinha->words = implode('|', $request->words);
        $cruzadinha->tips = implode('|', $request->tips);
        $cruzadinha->image_tips = $request->image_tips;
        $cruzadinha->save();

        return $this->sendResponse(new CruzadinhaResource($cruzadinha), 'Cruzadinha created successfully.');
    }
    /**
     * Display the specified resource.
     *
     * @param  Cruzadinha  $cruzadinha
     * @return JsonResponse
     */
    public function show(Cruzadinha $cruzadinha): JsonResponse
    {
        return $this->sendResponse(new CruzadinhaResource($cruzadinha), 'Quiz game information retrieved successfully.');
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

            return $this->sendResponse(new CruzadinhaResource($cruzadinha), "Product updated successfully.");
        }
        return $this->sendError("Bad request", ["Invalid request"], 400);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        return $this->sendError('');
    }
}
