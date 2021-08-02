<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\SelfAssessmentActionPlan;
use Faker\Generator as Faker;

$factory->define(SelfAssessmentActionPlan::class, function (Faker $faker) {
    return [
        'description' => $faker->sentence,
        'due_date' => $faker->date,
        'note' => $faker->sentence,
        'status' => 1,
    ];
});
