<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaskAttachment extends Model
{
    protected $guarded = [];

    public function task()
    {
        return $this->belongsTo('App\Models\Task');
    }
}
