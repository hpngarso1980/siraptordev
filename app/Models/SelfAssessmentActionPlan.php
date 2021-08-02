<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SelfAssessmentActionPlan extends Model
{
    protected $guarded = [];

    public static function boot() {
        parent::boot();

        static::deleting(function($actionPlan) {
            $actionPlan->assignees()->detach();
            $actionPlan->streams()->detach();
            $actionPlan->areas()->detach();
            $actionPlan->subAreas()->detach();
            $actionPlan->histories()->delete();
        });
    }

    public function assignees()
    {
        return $this->belongsToMany('App\Models\User', 'self_assessment_action_plan_has_assignee');
    }

    public function epic()
    {
        return $this->belongsTo('App\Models\Epic');
    }

    public function streams()
    {
        return $this->belongsToMany('App\Models\SelfAssessmentStream', 'self_assessment_action_plan_has_stream');
    }

    public function areas()
    {
        return $this->belongsToMany('App\Models\SelfAssessmentArea', 'self_assessment_action_plan_has_area');
    }

    public function subAreas()
    {
        return $this->belongsToMany('App\Models\SelfAssessmentSubArea', 'self_assessment_action_plan_has_sub_area');
    }

    public function category()
    {
        return $this->belongsTo('App\Models\ActionPlanCategory', 'action_plan_category_id');
    }

    public function histories()
    {
        return $this->morphMany('App\Models\ActionPlanHistory', 'model');
    }
}
