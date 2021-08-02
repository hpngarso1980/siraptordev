<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SelfAssessmentStream extends Model
{
    protected $guarded = [];

    public function areaGroups()
    {
        return $this->hasMany('App\Models\SelfAssessmentAreaGroup', 'self_assessment_stream_id');
    }

    public function tasks()
    {
        return $this->morphMany('App\Models\Task', 'taskable');
    }

    public function selfAssessmentActionPlans()
    {
        return $this->belongsToMany('App\Models\SelfAssessmentActionPlan', 'self_assessment_action_plan_has_stream');
    }
    public static function getStreamId($streamname)
    {
        return SelfAssessmentStream::where('name', $streamname)->first()->id;
    }
}
