<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\PerformanceActionPlan;
use Faker\Generator as Faker;

$factory->define(PerformanceActionPlan::class, function (Faker $faker) {
    return [
        'description' => $faker->sentence,
        'due_date' => $faker->date,
        'note' => $faker->sentence,
        'status' => 1,
    ];
});
