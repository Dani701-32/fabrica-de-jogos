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
// Home Route
Route::get('/create', static function () {
    return view('index');
});
// Game routes
Route::get('/wordsearch/{wordsearch}', static function (WordSearch $wordsearch) {
    return view('index');
});
Route::get('/quiz/{quiz}', static function (Quiz $quiz) {
    return view('index');
});
Route::get('/anagram/{anagram}', static function (Anagram $anagram) {
    return view('index');
});
Route::get('/matchup/{matchup}', static function (Matchup $matchup) {
    return view('index');
});
Route::get('/trueorfalse/{trueorfalse}', static function (trueOrFalse $trueorfalse){
    return view('index');
});
Route::get('/memorygame/{memorygame}', static function (MemoryGame $memorygame) {
    return view('index');
});
// Creation routes
Route::get('/create/quiz', static function () {
    return view('index');
});
Route::get('/create/anagram', static function () {
    return view('index');
});
Route::get('/create/wordsearch', static function () {
    return view('index');
});
Route::get('/create/trueorfalse', static function () {
    return view('index');
});
Route::get('/create/matchup', static function () {
    return view('index');
});
Route::get('/create/memorygame', static function () {
    return view('index');
});
// Edit routes
Route::get('/edit/anagram/{anagram}', static function (Anagram $anagram) {
    return view('index');
});
Route::get('/edit/matchup/{matchup}', static function (Matchup $matchup) {
    return view('index');
});
Route::get('/edit/memorygame/{memorygame}', static function (Memorygame $memorygame) {
    return view('index');
});
Route::get('/edit/quiz/{quiz}', static function (Quiz $quiz) {
    return view('index');
});
Route::get('/edit/trueorfalse/{trueorfalse}', static function (TrueOrFalse $trueOrFalse) {
    return view('index');
});
Route::get('/edit/wordsearch/{wordsearch}', static function (Wordsearch $wordsearch) {
    return view('index');
});
// Error routes
Route::get('/401', static function () {
   return view('errors.401');
});
Route::get('/403', static function () {
    return view('errors.403');
});
Route::get('/404', static function () {
    return view('errors.404');
});
Route::get('/419', static function () {
    return view('errors.419');
});
Route::get('/429', static function () {
    return view('errors.429');
});
Route::get('/500', static function () {
    return view('errors.500');
});
Route::get('/503', static function () {
    return view('errors.503');
});
