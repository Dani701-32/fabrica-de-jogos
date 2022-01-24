<?php

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
Route::get('/wordsearch/{slug}', function () {
    return view('index');
});
Route::get('/quiz/{slug}', function () {
    return view('index');
});
Route::get('/anagram/{slug}', function () {
    return view('index');
});
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

