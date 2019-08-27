<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Classe;
use Faker\Generator as Faker;

$factory->define(Classe::class, function (Faker $faker, Array $datas) {
    $est = '';
    return [
        'classe_name' => $faker->text(15),
        'user_id' => $datas['user_id'],
    ];
});
