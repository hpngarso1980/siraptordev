<?php

namespace App\Imports;

use App\Models\SelfAssessmentSubArea;
use App\Models\SelfAssessmentCriterion;
use Maatwebsite\Excel\Concerns\ToModel;

class Criteria implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new SelfAssessmentCriterion([
            //
            'self_assessment_sub_area_id' => SelfAssessmentSubArea::getSubAreaId($row[0], $row[1], $row[2], $row[3]),
            'name' => $row[4],
        ]);
    }
}
