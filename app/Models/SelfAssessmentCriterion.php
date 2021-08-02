<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SelfAssessmentCriterion extends Model
{
    protected $guarded = [];

    public function subArea()
    {
        return $this->belongsTo('App\Models\SelfAssessmentSubArea', 'self_assessment_sub_area_id');
    }
}
