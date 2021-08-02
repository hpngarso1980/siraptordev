<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\PerformanceIndicator;

class PerformanceAssessment extends Model
{
    protected $guarded = [];

    protected $casts = [
        'accomplishment_percentage' => 'float',
        'realization' => 'float',
        'score' => 'float',
        'target' => 'float',
    ];

    public function indicator()
    {
        return $this->belongsTo('App\Models\PerformanceIndicator');
    }

    protected static function boot()
    {
        parent::boot();
    }
}
