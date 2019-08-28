<?php

use App\Color;
use App\Program;
use App\Skill;
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
                }

                /* PROGRAMS
                -------------------------- */
                Program::insert([
                    'program_name'  => 'Programme par défaut',
                    'classe_id'     => $classe->id,
                    'created_at'    => now()
                ]);
                $program = Program::latest('created_at')->first();

                /* SKILLS
                -------------------------- */
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
                    ],[
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
                $skills = $program->skills()->get();

                /* COLORS
                -------------------------- */
                foreach($skills as $i => $skill) {
                    Color::insert([
                        [
                            'skill_level'   => $i + 1,
                            'hexa_color'    => '#ffffff',
                            'skill_id'      => $skill->id
                        ],[
                            'skill_level'   => $i + 1,
                            'hexa_color'    => '#fce844',
                            'skill_id'      => $skill->id
                        ],[
                            'skill_level'   => $i + 1,
                            'hexa_color'    => '#fea745',
                            'skill_id'      => $skill->id
                        ],[
                            'skill_level'   => $i + 1,
                            'hexa_color'    => '#318006',
                            'skill_id'      => $skill->id
                        ],[
                            'skill_level'   => $i + 1,
                            'hexa_color'    => '#fb4244',
                            'skill_id'      => $skill->id
                        ],[
                            'skill_level'   => $i + 1,
                            'hexa_color'    => '#347af8',
                            'skill_id'      => $skill->id
                        ]
                    ]);
                }

                /* UPDATES
                -------------------------- */
                // foreach();
        });
    }
}
