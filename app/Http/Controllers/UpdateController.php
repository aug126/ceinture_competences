<?php

namespace App\Http\Controllers;

use App\Student;
use App\Update;
use Illuminate\Http\Request;

class UpdateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $student_id)
    {
        $student = Student::find($student_id);
        $actual_level = $student->updates()
        ->where('skill_id', '=', $request->skillId)
        ->orderBy('id', 'desc')
        ->first();
        $actual_level = ($actual_level !== null) ? $actual_level->actual_level : 0;
        if ($request->status === 'success')
            $actual_level ++;
        $insert = Update::insert([
            'status'        => $request->status,
            'actual_level'  => $actual_level,
            'message'       => $request->message,
            'skill_id'      => $request->skillId,
            'student_id'    => $student_id,
            'date'    => $request->date
        ]);
        return ['success' => $insert];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Update  $update
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Update  $update
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Update  $update
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function massUpdate(Request $request)
    {
        foreach ($request->updates as $update)
        {

            $update_model = Update::find($update['id']);
            $update_model->message = $update['message'];
            $update_model->save();
            if ($update['status'] === 'deleted')
                $update_model->delete();

        }
    }
}
