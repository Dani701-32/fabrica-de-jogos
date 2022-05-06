<?php

use Illuminate\Support\Facades\Route;
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

Route::post('{gamecategory}', [GameController::class, 'store']);
Route::get('{gamecategory}/{game}', [GameController::class, 'show'])->scopeBindings();
Route::put('{gamecategory}/{game}', [GameController::class, 'update'])->scopeBindings();
Route::delete('{gamecategory}/{game}', [GameController::class, 'delete'])->scopeBindings();
Route::put('{gamecategory}/{game}/approve', [GameController::class, 'approve'])->scopeBindings();
