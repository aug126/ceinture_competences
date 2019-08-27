<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Student;
use Faker\Generator as Faker;

$factory->define(Student::class, function (Faker $faker, Array $datas) {
    return [
        'order_number' => $datas['order_number'],
        'student_name' => $faker->name(),
        'classe_id'   => $datas['classe_id'],
    ];
});
