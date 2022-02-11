<?php

use App\Models\Anagram;
use App\Models\MatchUp;
use App\Models\MemoryGame;
use App\Models\Quiz;
use App\Models\TrueOrFalse;
use App\Models\WordSearch;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    return view('index');
});
// Game page routes
Route::get('/wordsearch/{wordsearch}', function (WordSearch $wordsearch) {
    return view('index');
});
Route::get('/quiz/{quiz}', function (Quiz $quiz) {
    return view('index');
});
Route::get('/anagram/{anagram}', function (Anagram $anagram) {
    return view('index');
});
Route::get('/matchup/{matchup}', function (Matchup $matchup) {
    return view('index');
});
Route::get('/trueorfalse/{trueorfalse}', function (trueOrFalse $trueorfalse){
    return view('index');
});
Route::get('/memorygame/{memorygame}', function (MemoryGame $memorygame) {
    return view('index');
});
// Creation page routes
Route::get('/create/quiz', function () {
    return view('index');
});
Route::get('/create/anagram', function () {
    return view('index');
});
Route::get('/create/wordsearch', function () {
    return view('index');
});
Route::get('/create/trueorfalse', function () {
    return view('index');
});
Route::get('/create/matchup', function () {
    return view('index');
});
Route::get('/create/memorygame', function () {
    return view('index');
});

