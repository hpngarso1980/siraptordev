<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Epic extends Model
{
    protected $guarded = [];

    public function getStartDateAttribute($value)
    {
        return $value ? date('Y-m-d', strtotime($value)) : NULL;
    }

    public function getEndDateAttribute($value)
    {
        return $value ? date('Y-m-d', strtotime($value)) : NULL;
    }

    public function tasks()
    {
        return $this->hasMany('App\Models\Task');
    }
}
