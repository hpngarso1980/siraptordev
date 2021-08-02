<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PerformanceIndicator extends Model
{
    protected $guarded = [];

    protected $casts = [
        'weight' => 'float',
    ];

    public function template()
    {
        return $this->belongsTo('App\Models\PerformanceTemplate');
    }

    public function indicatorGroup()
    {
        return $this->belongsTo('App\Models\PerformanceIndicatorGroup', 'performance_indicator_group_id');
    }

    public function assessments()
    {
        return $this->hasMany('App\Models\PerformanceAssessment');
    }

    public function children()
    {
        return $this->hasMany('App\Models\PerformanceIndicator', 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo('App\Models\PerformanceIndicator', 'parent_id');
    }
}
