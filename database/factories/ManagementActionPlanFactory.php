<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\ManagementActionPlan;
use Faker\Generator as Faker;

$factory->define(ManagementActionPlan::class, function (Faker $faker) {
    return [
        'description' => $faker->sentence,
        'due_date' => $faker->date,
        'note' => $faker->sentence,
        'status' => 1,
    ];
});
