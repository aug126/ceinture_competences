<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Student;
use Faker\Generator as Faker;

$factory->define(Student::class, function (Faker $faker, $numero, $classes_id) {
    echo $numero;
    return [
        'order_number' => $faker->randomNumber(2),
        'student_name' => $faker->name(),
        'classes_id'   => $faker->randomNumber(),
    ];
});
