<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Models\Anagram;
use App\Http\Resources\Anagram as AnagramResource;
use App\Models\MatchUp;
use App\Http\Resources\MatchUp as MatchUpResource;
use App\Models\MemoryGame;
use App\Http\Resources\MemoryGame as MemoryGameResource;
use App\Models\Quiz;
use App\Http\Resources\Quiz as QuizResource;
use App\Models\TrueOrFalse;
use App\Http\Resources\TrueOrFalse as TrueOrFalseResource;
use App\Models\WordSearch;
use App\Http\Resources\WordSearch as WordSearchResource;


class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param string|null $origin
     * @param int|null $user_id
     * @return JsonResponse
     */
    public function index(string $origin = null, int $user_id = null): JsonResponse
    {
        $games = [];
        if ($user_id && $origin) {
            $games[] = AnagramResource::collection(Anagram::all()->where('user_id', $user_id)->where('origin', $origin));
            $games[] = MatchUpResource::collection(MatchUp::all()->where('user_id', $user_id)->where('origin', $origin));
            $games[] = MemoryGameResource::collection(MemoryGame::all()->where('user_id', $user_id)->where('origin', $origin));
            $games[] = QuizResource::collection(Quiz::all()->where('user_id', $user_id)->where('origin', $origin));
            $games[] = TrueOrFalseResource::collection(TrueOrFalse::all()->where('user_id', $user_id)->where('origin', $origin));
            $games[] = WordSearchResource::collection(WordSearch::all()->where('user_id', $user_id)->where('origin', $origin));
        }
        else if($origin){
            $games[] = AnagramResource::collection(Anagram::all()->where('origin', $origin));
            $games[] = MatchUpResource::collection(MatchUp::all()->where('origin', $origin));
            $games[] = MemoryGameResource::collection(MemoryGame::all()->where('origin', $origin));
            $games[] = QuizResource::collection(Quiz::all()->where('origin', $origin));
            $games[] = TrueOrFalseResource::collection(TrueOrFalse::all()->where('origin', $origin));
            $games[] = WordSearchResource::collection(WordSearch::all()->where('origin', $origin));
        }
        else {
            $games[] = AnagramResource::collection(Anagram::all());
            $games[] = MatchUpResource::collection(MatchUp::all());
            $games[] = MemoryGameResource::collection(MemoryGame::all());
            $games[] = QuizResource::collection(Quiz::all());
            $games[] = TrueOrFalseResource::collection(TrueOrFalse::all());
            $games[] = WordSearchResource::collection(WordSearch::all());
        }
        return Response()->json($games);
    }

}
