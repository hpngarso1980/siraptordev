<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActionPlanCategory extends Model
{
    protected $guarded = [];

    public function selfAssessmentActionPlans()
    {
        return $this->hasMany('App\Models\SelfAssessmentActionPlan', 'action_plan_category_id');
    }
}
