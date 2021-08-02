<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\SelfAssessmentStream;

class SelfAssessmentStreamRepository extends BaseRepository
{
    public function __construct(SelfAssessmentStream $selfAssessmentStream)
    {
        $this->model = $selfAssessmentStream;
    }
}
