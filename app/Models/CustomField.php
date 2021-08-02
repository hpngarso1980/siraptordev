<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomField extends Model
{
    protected $guarded = [];

    public function tasks()
    {
        return $this
            ->belongsToMany('App\Models\Task', 'task_custom_fields')
            ->using('App\Models\TaskCustomField')
            ->withPivot(['value'])
            ->withTimestamps();
    }
}
