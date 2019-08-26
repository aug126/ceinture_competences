<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
    public function index()
    {
        // $new = new \App\Test;
        // $new->classe_name = 'ma deuxième classe';
        // $new->save();
        $classes = \App\Test::all();
        foreach ($classes as $classe) {
            echo $classe->classe_name;
        }
        // $test = DB::insert('insert into classes (classe_name) values ( ? )', ['ma première classe']);
        $test = DB::select('select * from classes')[0];
        return view('welcome')->with('test', $test);
    }
}
