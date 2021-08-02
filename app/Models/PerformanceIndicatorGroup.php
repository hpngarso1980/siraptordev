<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PerformanceIndicatorGroup extends Model
{
    protected $casts = [
        'deduction' => 'boolean',
    ];

    public function indicators()
    {
        return $this->hasMany('App\Models\PerformanceIndicator');
    }
}
