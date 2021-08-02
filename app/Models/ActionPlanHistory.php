<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActionPlanHistory extends Model
{
    const UPDATED_AT = NULL;

    protected $guarded = [];

    public function model()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
