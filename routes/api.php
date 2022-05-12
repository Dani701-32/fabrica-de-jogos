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

Route::post('{gameCategory}', [GameController::class, 'store']);
Route::get('{gameCategory}/{game}', [GameController::class, 'show'])->scopeBindings();
Route::put('{gameCategory}/{game}', [GameController::class, 'update'])->scopeBindings();
Route::delete('{gameCategory}/{game}', [GameController::class, 'delete'])->scopeBindings();
Route::put('{gameCategory}/{game}/approve', [GameController::class, 'approve'])->scopeBindings();
