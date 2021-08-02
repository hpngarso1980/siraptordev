<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PerformanceTemplate extends Model
{
    protected $guarded = [];

    public function indicators()
    {
        return $this->hasMany('App\Models\PerformanceIndicator');
    }

    public function actionPlans()
    {
        return $this->hasMany('App\Models\PerformanceActionPlan');
    }
}
