<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Epic;
use Faker\Generator as Faker;

$factory->define(Epic::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence,
        'state' => 1,
        'start_date' => $faker->date('Y-m-d'),
        'end_date' => $faker->date('Y-m-d'),
    ];
});
