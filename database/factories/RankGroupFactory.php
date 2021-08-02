<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\RankGroup;
use Faker\Generator as Faker;

$factory->define(RankGroup::class, function (Faker $faker) {
    return [
        'title' => $faker->word,
        'order' => 1,
    ];
});
