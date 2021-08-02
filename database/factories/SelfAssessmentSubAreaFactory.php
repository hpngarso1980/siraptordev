<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\SelfAssessmentSubArea;
use Faker\Generator as Faker;

$factory->define(SelfAssessmentSubArea::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
        'weight' => 0.5,
    ];
});
