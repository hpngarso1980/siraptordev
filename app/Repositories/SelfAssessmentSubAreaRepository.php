<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\SelfAssessmentSubArea;

class SelfAssessmentSubAreaRepository extends BaseRepository
{
    public function __construct(SelfAssessmentSubArea $selfAssessmentSubArea)
    {
        $this->model = $selfAssessmentSubArea;
    }

    public function paginateByArea($areaId, $limit)
    {
        return $this->model->where('self_assessment_area_id', $areaId)->paginate($limit);
    }
}
