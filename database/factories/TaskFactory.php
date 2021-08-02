<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Task;
use Faker\Generator as Faker;

$factory->define(Task::class, function (Faker $faker) {
    return [
        'type' => 1,
        'title' => $faker->sentence,
        'description' => $faker->sentence,
        'state' => 1,
        'due_date' => $faker->date('Y-m-d'),
    ];
});
