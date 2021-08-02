<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\SelfAssessmentStream;
use Faker\Generator as Faker;

$factory->define(SelfAssessmentStream::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
    ];
});
