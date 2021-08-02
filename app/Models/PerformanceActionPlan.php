<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PerformanceActionPlan extends Model
{
    protected $guarded = [];

    public static function boot() {
        parent::boot();

        static::deleting(function($actionPlan) {
            $actionPlan->assignees()->detach();
            $actionPlan->histories()->delete();
        });
    }

    public function assignees()
    {
        return $this->belongsToMany('App\Models\User', 'performance_action_plan_has_assignee');
    }

    public function performanceTemplate()
    {
        return $this->belongsTo('App\Models\PerformanceTemplate');
    }

    public function histories()
    {
        return $this->morphMany('App\Models\ActionPlanHistory', 'model');
    }
}
