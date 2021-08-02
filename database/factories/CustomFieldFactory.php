<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\CustomField;
use Faker\Generator as Faker;

$factory->define(CustomField::class, function (Faker $faker) {
    return [
        'type' => 'text',
        'name' => 'custom_field',
        'title' => 'Custom Field',
    ];
});
