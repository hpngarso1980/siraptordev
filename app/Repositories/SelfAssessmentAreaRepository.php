<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\SelfAssessmentArea;
use App\Models\SelfAssessmentAreaGroup;

class SelfAssessmentAreaRepository extends BaseRepository
{
    public function __construct(SelfAssessmentArea $selfAssessmentArea)
    {
        $this->model = $selfAssessmentArea;
    }

    public function findAllByAreaGroupId($areaGroupId)
    {
        return $this->model->where('self_assessment_area_group_id', $areaGroupId)->get();
    }

    public function findAllByStreamId($streamId)
    {
        $areaGroupIds = SelfAssessmentAreaGroup::select('id')
            ->where('self_assessment_stream_id', $streamId)
            ->get()
            ->map(function($item) {
                return $item->id;
            });

        return $this->model->whereIn('self_assessment_area_group_id', $areaGroupIds)->get();
    }
}
