<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\SelfAssessmentArea;
use Faker\Generator as Faker;

$factory->define(SelfAssessmentArea::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
    ];
});
