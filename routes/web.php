<?php

use App\Models\Game;
use App\Models\GameCategory;
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
Route::get('/', static function () {
    return view('index');
});
// Game routes
Route::get('/game/{gameCategory}/{game}', static function (GameCategory $gameCategory, Game $game) {
    return view('index');
})->scopeBindings();
// Creation routes
Route::get('/create/{gameCategory}', static function (GameCategory $gameCategory) {
    return view('index');
});
// Edit routes
Route::get('/edit/{gameCategory}/{game}', static function (GameCategory $gameCategory, Game $game) {
    return view('index');
})->scopeBindings();
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
