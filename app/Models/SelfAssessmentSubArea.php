<?php

namespace App\Models;

use App\Models\SelfAssessmentArea;
use Illuminate\Database\Eloquent\Model;

class SelfAssessmentSubArea extends Model
{
    protected $guarded = [];

    public function area()
    {
        return $this->belongsTo('App\Models\SelfAssessmentArea', 'self_assessment_area_id');
    }

    public function criteria()
    {
        return $this->hasMany('App\Models\SelfAssessmentCriterion', 'self_assessment_sub_area_id');
    }

    public function tasks()
    {
        return $this->morphMany('App\Models\Task', 'taskable');
    }

    public function selfAssessmentActionPlans()
    {
        return $this->belongsToMany('App\Models\SelfAssessmentActionPlan', 'self_assessment_action_plan_has_sub_area');
    }

    public static function getSubAreaId($streaname, $groupname, $areaname, $subareaname)
    {
        $areaid = SelfAssessmentArea::getAreaId($streaname, $groupname, $areaname);
        return SelfAssessmentSubArea::where('self_assessment_area_id', $areaid)->
        where('name', $subareaname)->first()->id;

    }
}
