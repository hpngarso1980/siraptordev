<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\SelfAssessmentCriterion;

class SelfAssessmentCriterionRepository extends BaseRepository
{
    public function __construct(SelfAssessmentCriterion $selfAssessmentCriterion)
    {
        $this->model = $selfAssessmentCriterion;
    }

    public function paginateBySubArea($subAreaId, $limit)
    {
        return $this->model
            ->with(['subArea'])
            ->where('self_assessment_sub_area_id', $subAreaId)
            ->paginate($limit);
    }
}
