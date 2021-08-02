<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\PerformanceIndicatorGroup;

class PerformanceIndicatorGroupRepository extends BaseRepository
{
    public function __construct(PerformanceIndicatorGroup $performanceIndicatorGroup)
    {
        $this->model = $performanceIndicatorGroup;
    }
}
