<?php

use App\Color;
use App\Program;
use App\Skill;
use App\Update;
use App\User;
use Illuminate\Database\Seeder;

class ClassesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /* USER
        -------------------------- */
        // $user = factory(App\User::class)->create();
        User::insert([
            'name' => 'augustin',
            'email' => 'doat.augustin@gmail.com',
            'email_verified_at' => now(),
            'password' => bcrypt('admin'), // password
            'remember_token' => Str::random(10),
        ]);
        $user = User::first();

        /* CLASSES
        -------------------------- */
        factory(App\Classe::class, 3)
            ->create(['user_id' => $user->id])
            ->each(function ($classe) {


                /* PROGRAMS
                -------------------------- */
                Program::insert([
                    [
                        'program_name'  => 'Mathémathiques',
                        'classe_id'     => $classe->id,
                        'created_at'    => now()
                    ], [
                        'program_name'  => 'Français',
                        'classe_id'     => $classe->id,
                        'created_at'    => now()
                    ],
                ]);
                $programs = Program::latest('created_at')->limit(2)->get();

                /* SKILLS
                -------------------------- */
                foreach($programs as $program) {
                    if ($program->program_name === 'Mathémathiques')
                        Skill::insert([
                            [
                                'skill_name' => 'Numération',
                                'program_id' => $program->id
                            ],[
                                'skill_name' => 'Calculs Écrits',
                                'program_id' => $program->id
                            ],[
                                'skill_name' => 'Mesures',
                                'program_id' => $program->id
                            ],[
                                'skill_name' => 'Géométrie',
                                'program_id' => $program->id
                            ],
                        ]);
                    else if ($program->program_name === 'Français')
                        Skill::insert([
                            [
                                'skill_name' => 'Grammaire',
                                'program_id' => $program->id
                            ],[
                                'skill_name' => 'Conjugaison',
                                'program_id' => $program->id
                            ],[
                                'skill_name' => 'Orthographe',
                                'program_id' => $program->id
                            ]
                        ]);
                }
                
                /* COLORS
                -------------------------- */
                foreach($programs as $program) {
                    $skills = $program->skills()->get();

                    foreach($skills as $i => $skill) {
                        Color::insert([
                            [
                                'skill_level'   => 1,
                                'hexa_color'    => '#ffffff',
                                'skill_id'      => $skill->id
                            ],[
                                'skill_level'   => 2,
                                'hexa_color'    => '#fce844',
                                'skill_id'      => $skill->id
                            ],[
                                'skill_level'   => 3,
                                'hexa_color'    => '#fea745',
                                'skill_id'      => $skill->id
                            ],[
                                'skill_level'   => 4,
                                'hexa_color'    => '#318006',
                                'skill_id'      => $skill->id
                            ],[
                                'skill_level'   => 5,
                                'hexa_color'    => '#fb4244',
                                'skill_id'      => $skill->id
                            ],[
                                'skill_level'   => 6,
                                'hexa_color'    => '#347af8',
                                'skill_id'      => $skill->id
                            ]
                        ]);
                    }
                }

                /* STUDENTS
                -------------------------- */
                $a = 1;
                while ($a <= 25) {
                    $student = factory(App\Student::class)->create([
                        'classe_id' => $classe->id,
                        'order_number' => $a
                        ]);
                    $classe->students()
                        ->save($student);
                    $a++;

                    /* UPDATES
                    -------------------------- */
                    foreach($programs as $program) {
                        $skills = $program->skills()->get();
                        foreach ($skills as $skill) {
                            $b = 1;
                            $max = random_int(1, 6);
                            $acutal_level = 0;
                            while ($b <= $max) {
                                $status_i = random_int(0, 2);
                                $status_array = ['success', 'fail', 'practice'];
                                if ($status_array[$status_i] === 'success') {
                                    $acutal_level ++;
                                }
                                Update::insert([
                                    'status'        => $status_array[$status_i],
                                    'skill_id'      => $skill->id,
                                    'student_id'    => $student->id,
                                    'actual_level'  => $acutal_level
                                ]);
                                $b++;
                            }
                        }
                    }
                }
        });
    }
}
