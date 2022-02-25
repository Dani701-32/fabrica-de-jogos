<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\QuizController;
use App\Http\Controllers\API\MatchUpController;
use App\Http\Controllers\API\AnagramController;
use App\Http\Controllers\API\TrueOrFalseController;
use App\Http\Controllers\API\WordSearchController;
use App\Http\Controllers\API\MemoryGameController;
use App\Http\Controllers\API\GameController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::resource('quiz', QuizController::class);
Route::put('quiz/{quiz}/approve', [QuizController::class, 'approve']);
Route::resource('matchup', MatchUpController::class);
Route::put('matchup/{matchup}/approve', [MatchUpController::class, 'approve']);
Route::resource('anagram', AnagramController::class);
Route::put('anagram/{anagram}/approve', [AnagramController::class, 'approve']);
Route::resource('trueorfalse', TrueOrFalseController::class);
Route::put('trueorfalse/{trueorfalse}/approve', [TrueOrFalseController::class, 'approve']);
Route::resource('wordsearch', WordSearchController::class);
Route::put('wordsearch/{wordsearch}/approve', [WordSearchController::class, 'approve']);
Route::resource('memorygame', MemoryGameController::class);
Route::put('memorygame/{memorygame}/approve', [MemoryGameController::class, 'approve']);
Route::get('games/{origin?}/{user_id?}', [GameController::class, 'index']);
