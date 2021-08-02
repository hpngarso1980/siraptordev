<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\SelfAssessmentAreaGroup;

class SelfAssessmentAreaGroupRepository extends BaseRepository
{
    public function __construct(SelfAssessmentAreaGroup $selfAssessmentAreaGroup)
    {
        $this->model = $selfAssessmentAreaGroup;
    }

    public function findAllByStreamId($streamId)
    {
        return $this->model
            ->with(['allChildren'])
            ->where('self_assessment_stream_id', $streamId)
            ->get();
    }
}
