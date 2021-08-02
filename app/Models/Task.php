<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $guarded = [];
    public $sub_tasks = [];


    public function getDueDateAttribute($value)
    {
        return $value ? date('Y-m-d', strtotime($value)) : NULL;
    }

    public function epic()
    {
        return $this->belongsTo('App\Models\Epic');
    }

    public function parent()
    {
        return $this->belongsTo('App\Models\Task', 'parent_id');
    }

    public function subTasks()
    {
        return $this->hasMany('App\Models\Task', 'parent_id');
    }

    public function allSubTasks()
    {
        return $this->subTasks()->with('allSubTasks');
    }

    public function taskable()
    {
        return $this->morphTo();
    }

    public function assignees()
    {
        return $this->belongsToMany('App\Models\User', 'task_assignees');
    }

    public function customFields()
    {
        return $this
            ->belongsToMany('App\Models\CustomField', 'task_custom_fields')
            ->using('App\Models\TaskCustomField')
            ->withPivot(['value'])
            ->withTimestamps();
    }

    public function attachments()
    {
        return $this->hasMany('App\Models\TaskAttachment');
    }
}
