<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\QuizController;
use App\Http\Controllers\API\CruzadinhaController;
use App\Http\Controllers\API\MatchUpController;
use App\Http\Controllers\API\AnagramController;
use App\Http\Controllers\API\TrueOrFalseController;
use App\Http\Controllers\API\WordSearchController;
use App\Http\Controllers\API\MemoryGameController;

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

Route::post('register', [UserController::class, 'register'])->name('register');
Route::post('login', [UserController::class, 'login'])->name('login');

Route::middleware('auth:api')->group( function () {
    Route::resource('quiz', QuizController::class);
    Route::resource('cruzadinha', CruzadinhaController::class);
    Route::resource('matchup', MatchUpController::class);
    Route::resource('anagram', AnagramController::class);
    Route::resource('trueorfalse', TrueOrFalseController::class);
    Route::resource('wordsearch', WordSearchController::class);
    Route::resource('memorygame', MemoryGameController::class);
    Route::post('results', function (Request $request) {
        return $request;
    });
});
