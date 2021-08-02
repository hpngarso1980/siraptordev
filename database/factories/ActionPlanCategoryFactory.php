<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\ActionPlanCategory;
use Faker\Generator as Faker;

$factory->define(ActionPlanCategory::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
    ];
});
