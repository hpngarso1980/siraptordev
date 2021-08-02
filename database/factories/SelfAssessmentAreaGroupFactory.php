<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\SelfAssessmentAreaGroup;
use Faker\Generator as Faker;

$factory->define(SelfAssessmentAreaGroup::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
        'weight' => 1,
    ];
});
