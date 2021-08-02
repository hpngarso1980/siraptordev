<?php

namespace App\Models;

use App\Models\SelfAssessmentStream;
use Illuminate\Database\Eloquent\Model;

class SelfAssessmentArea extends Model
{
    protected $guarded = [];

    public function areaGroup()
    {
        return $this->belongsTo('App\Models\SelfAssessmentAreaGroup', 'self_assessment_area_group_id');
    }

    public function subAreas()
    {
        return $this->hasMany('App\Models\SelfAssessmentSubArea', 'self_assessment_area_id');
    }

    public function tasks()
    {
        return $this->morphMany('App\Models\Task', 'taskable');
    }

    public function selfAssessmentActionPlans()
    {
        return $this->belongsToMany('App\Models\SelfAssessmentActionPlan', 'self_assessment_action_plan_has_area');
    }

    public static function getAreaId($streamname, $groupname, $areaname)
    {
        $groupid = SelfAssessmentAreaGroup::getGroupId($streamname, $groupname);
        return SelfAssessmentArea::where('self_assessment_area_group_id', $groupid)->
        where('name', $areaname)->first()->id;
    }
}
