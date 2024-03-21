<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Generalcontroller;
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
 


Route::controller(Generalcontroller::class)->group(function () {
    Route::get('/', 'index')->name('home');

    Route::get('/getparameters', 'getparameters')->name('getparameters');


Route::post('/weatherwarning', 'weatherwarning')->name('weatherwarning');
// routes/web.php
Route::post('/upload-recording', 'uploadRecording')->name('uploadRecording');

Route::get('/adminwarning', 'adminwarning')->name('adminwarning');
Route::get('/adminfeedback', 'adminfeedback')->name('adminfeedback');


});
