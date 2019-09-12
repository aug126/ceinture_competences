<?php

namespace App\Http\Controllers;

use App\Classe;
use App\Program;
use App\Skill;
use App\Student;
use App\Update;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $classes = Auth::user()->classes()->select('id', 'classe_name')->get();
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
        // Classe
        $new_classe = new Classe;
        $new_classe->classe_name = $request->classe_name;
        $new_classe->user_id = Auth::id();
        $new_added = $new_classe->save();
        $classe_id = $new_classe->id;

        // Students : add all
        $order = (object)['number' => 0];
        $arr_stu_datas = array_map(function($student_name) use($order, $classe_id){
            $order->number++;
            return [
                'order_number'  => $order->number,
                'student_name'  => $student_name,
                'classe_id'     => $classe_id
            ];
        }, $request->students);
        foreach ($arr_stu_datas as $stu_datas)
            Student::create($stu_datas);


        // Programs
        foreach ($request->progr_skills as $program) {
            $new_progr = Program::create([
                'program_name'  => $program['program_name'],
                'classe_id'     => $classe_id
            ]);
            $program_id = $new_progr->id;
            foreach ($program['competences'] as $competence) {
                Skill::create([
                    'skill_name'    => $competence,
                    'program_id'    => $program_id
                ]);
            }
        }

        return $new_added ? 'true' : 'false';
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Classe  $classe
     * @return \Illuminate\Http\Response
     */
    public function show($id) // GET     /api/classes/{id}
    {
        $classe = Classe::find($id);
        if ($classe->user_id !== Auth::id())
            return 'Not Authorize';
        $students = $classe->students()->get(['id', 'student_name', 'order_number']);
        $skills = Classe::find($id)->skills()->with('colors')->get();
        foreach($students as $student) {
            if ($student->id === 25) 
                echo '';
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
                $studentSkills[$key]['updates'] = isset($studentUpdates->$skill_id) ? $studentUpdates->$skill_id : [];
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
