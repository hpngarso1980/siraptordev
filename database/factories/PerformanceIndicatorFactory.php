<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\PerformanceIndicator;
use Faker\Generator as Faker;

$factory->define(PerformanceIndicator::class, function (Faker $faker) {
    return [
        'code' => $faker->word,
        'indicator' => $faker->sentence,
        'unit' => '%',
        'weight' => $faker->randomFloat(NULL, 0,  0.5),
    ];
});
