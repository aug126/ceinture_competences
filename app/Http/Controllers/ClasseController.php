<?php

namespace App\Http\Controllers;

use App\Classe;
use App\Update;
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
        $students = Classe::find($id)->students()->get(['id', 'student_name', 'order_number']);
        $skills = Classe::find($id)->skills()->with('colors')->get();
        foreach($students as $student) {
            $studentSkills = $skills->toArray();
            // transformer le $updates en {skill_id: [updates]}
            $updates = $student->updates()->get()->toArray();
            $studentUpdates = (object)[];

            foreach($updates as $update) {
                $skill_id = $update['skill_id'];
                if (isset($studentUpdates->$skill_id)) {
                    array_push($studentUpdates->$skill_id, $update);
                } else $studentUpdates->$skill_id = [$update];
            };

            foreach($studentSkills as $key => $skill) {
                $skill_id = $skill['id'];
                $studentSkills[$key]['updates'] = $studentUpdates->$skill_id;
            }

            $student->skills = $studentSkills;
        }
        return $students;
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
