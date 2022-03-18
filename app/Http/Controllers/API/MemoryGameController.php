<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\MemoryGame;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Resources\MemoryGame as MemoryGameResource;
use App\Models\Image;
use Storage;

class MemoryGameController extends Controller
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
            'images' => 'required|max:6|min:2',
            'images.*' => 'mimes:jpeg,jpg,png'
        ]);
        $memory = new MemoryGame();
        $memory->name = $request->name;
        $memory->layout = $request->layout;
        $files = $request->file('images');
        switch (sizeof($files)) {
            case 2:
                $memory->grid = serialize([2, 2]);
                break;
            case 3:
                $memory->grid = serialize([3, 2]);
                break;
            case 4:
                $memory->grid = serialize([4, 2]);
                break;
            case 5:
                $memory->grid = serialize([5, 2]);
                break;
            case 6:
                $memory->grid = serialize([4, 3]);
                break;
            default:
                return response()->json(['Bad Request'=> 'Invalid number of files'], 400);
        }
        $memory->save();
        $index = 0;
        foreach ($files as $file) {
            $path = "storage/memorygame";
            $fileName = $memory->slug ."_". $index . "." . $file->getClientOriginalExtension();
            Storage::disk('s3')->delete($fileName);
            $file->storeAs($path, $fileName, 's3');
            $image = new Image();
            $image->path = $path;
            $image->name = $fileName;
            $image->memory_game_id = $memory->id;
            $image->save();
            $index++;
        }

        return response()->json(new MemoryGameResource($memory), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  MemoryGame $memorygame
     * @return JsonResponse
     */
    public function show(MemoryGame $memorygame): JsonResponse
    {
        return response()->json(new MemoryGameResource($memorygame));
    }

    public function approve(MemoryGame $memorygame): JsonResponse
    {
        if ($memorygame->approved_at) {
            return response()->json('Memory Game Already Approved!', 400);
        }
        $memorygame->approved_at = Carbon::now();
        $memorygame->save();
        return response()->json('Memory Game Approved Successfully!');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param MemoryGame $memorygame
     * @return JsonResponse
     */
    public function update(Request $request, MemoryGame $memorygame): JsonResponse
    {
        if ($memorygame->approved_at){
            return response()->json(["Bad request" => "Memory Game Already Approved!"], 400);
        }

        if($request->hasfile('images')){
            $files = $request->file('images');
            switch (sizeof($files)) {
                case 2:
                    $memorygame->grid = serialize([2, 2]);
                    break;
                case 3:
                    $memorygame->grid = serialize([3, 2]);
                    break;
                case 4:
                    $memorygame->grid = serialize([4, 2]);
                    break;
                case 5:
                    $memorygame->grid = serialize([5, 2]);
                    break;
                case 6:
                    $memorygame->grid = serialize([4, 3]);
                    break;
                default:
                    return response()->json(['Bad Request'=> 'Invalid number of files'], 400);
            }
            $index = 0;
            foreach ($files as $file) {
                $path = "storage/memorygame";
                $fileName = $memorygame->slug ."_". $index . ".". $file->getClientOriginalExtension();
                Storage::disk('s3')->delete($fileName);
                $file->storeAs($path, $fileName, 's3');
                $old_images = Image::all()->where('memory_game_id', $memorygame->id);
                foreach ($old_images as $old_image){
                    Image::destroy($old_image->id);
                }
                $image = new Image();
                $image->path = $path;
                $image->name = $fileName;
                $image->memory_game_id = $memorygame->id;
                $image->save();
                $index++;
            }
        }
        if($request->name){
            $memorygame->name = $request->name;
        }
        if($request->layout){
            $memorygame->layout = $request->layout;
        }
        $memorygame->save();

        return response()->json((new MemoryGameResource($memorygame)));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param MemoryGame $memorygame
     * @return JsonResponse
     */
    public function destroy(MemoryGame $memorygame): JsonResponse
    {
        $memorygame->delete();
        return response()->json(['Success' => 'Memory Game Deleted Successfully!']);
    }
}
