<?php

use Illuminate\Support\Facades\DB;

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


Auth::routes();

Route::group(['middleware' => 'auth'], function() {
    Route::get('/', function () { return view('home'); });
    Route::get('classes', 'ClasseController@index');
    Route::get('classes/{id}', 'ClasseController@show');
    Route::get('programs/{classe_id}', 'ProgramController@index');

    Route::post('storeClasseStudents', 'ClasseController@store');
    Route::post('student/{student_id}/update', 'UpdateController@store');
    Route::post('student-editname/{student_id}', 'StudentController@update');

    Route::post('student/edit-updates', 'UpdateController@massUpdate');
});

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/home', function() {
    return redirect('/');
});