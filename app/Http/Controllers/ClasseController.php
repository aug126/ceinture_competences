<?php

namespace App\Http\Controllers;

use App\Classe;
use Illuminate\Http\Request;

class ClasseController extends Controller
{
    public function buildtable($id)
    {
        $table = Classe::find($id)->students()->with('updates')->get();
        $skills = Classe::find($id)->skills()->get();
        return $table . $skills;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() // GET      /api/classes/
    {
        $classes = Classe::select('id', 'classe_name')->get();
        return $classes;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) // POST      /api/classes
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Classe  $classe
     * @return \Illuminate\Http\Response
     */
    public function show($id) // GET     /api/classes/{id}
    {
        $classe = Classe::find($id)->students()->with('updates')->get();
        return $classe;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Classe  $classe
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) // PUT/PATCH     /api/classes/{id}
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Classe  $classe
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) // DELETE     /api/classes/{id}
    {
        //
    }
}
