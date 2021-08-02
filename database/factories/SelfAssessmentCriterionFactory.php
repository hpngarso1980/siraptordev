<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\SelfAssessmentCriterion;
use Faker\Generator as Faker;

$factory->define(SelfAssessmentCriterion::class, function (Faker $faker) {
    return [
        'score' => '1',
        'level' => $faker->word,
        'description' => $faker->word,
    ];
});
