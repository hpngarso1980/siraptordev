<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\PerformanceIndicatorGroup;
use Faker\Generator as Faker;

$factory->define(PerformanceIndicatorGroup::class, function (Faker $faker) {
    return [
        'title' => $faker->word,
        'slug' => $faker->word,
        'deduction' => 0,
    ];
});
