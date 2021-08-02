<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\PerformanceTemplate;
use Faker\Generator as Faker;

$factory->define(PerformanceTemplate::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
    ];
});
