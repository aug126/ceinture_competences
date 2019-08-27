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
        factory(App\Classe::class, 3)->create()->each(function ($classe) {
            $classe->students()->save(factory(App\Student::class, 20));
        });
    }
}
