<?php

namespace App\Models;

use App\Models\SelfAssessmentStream;
use Illuminate\Database\Eloquent\Model;

class SelfAssessmentAreaGroup extends Model
{
    protected $guarded = [];

    public function parent()
    {
        return $this->belongsTo('App\Models\SelfAssessmentAreaGroup', 'parent_id');
    }

    public function children()
    {
        return $this->hasMany('App\Models\SelfAssessmentAreaGroup', 'parent_id');
    }

    public function allChildren()
    {
        return $this->children()->with('allChildren');
    }

    public function stream()
    {
        return $this->belongsTo('App\Models\SelfAssessmentStream', 'self_assessment_stream_id');
    }

    public function areas()
    {
        return $this->hasMany('App\Models\SelfAssessmentArea', 'self_assessment_area_group_id');
    }

    public function tasks()
    {
        return $this->morphMany('App\Models\Task', 'taskable');
    }
    public static function getGroupId($streamname, $groupname)
    {
        $streamid = SelfAssessmentStream::getStreamId($streamname);
        return SelfAssessmentAreaGroup::where('self_assessment_stream_id', $streamid)->
        where('name', $groupname)->first()->id;
    }
}
