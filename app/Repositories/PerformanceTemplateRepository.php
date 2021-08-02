<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\PerformanceTemplate;

class PerformanceTemplateRepository extends BaseRepository
{
    public function __construct(PerformanceTemplate $performanceTemplate)
    {
        $this->model = $performanceTemplate;
    }
}
