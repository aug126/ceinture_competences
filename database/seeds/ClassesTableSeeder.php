<?php

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
        $user = factory(App\User::class)->create();
        factory(App\Classe::class, 3)
            ->create(['user_id' => $user->id])
            ->each(function ($classe) {
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
        });
    }
}
