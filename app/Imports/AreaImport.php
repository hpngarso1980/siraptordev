<?php

namespace App\Imports;

use App\Models\SelfAssessmentArea;
use App\Models\SelfAssessmentAreaGroup;
use Maatwebsite\Excel\Concerns\ToModel;

class AreaImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new SelfAssessmentArea([
            //
            'self_assessment_area_group_id' => SelfAssessmentAreaGroup::getStreamId($row[0],$row[1]),
            'name' => $row[2],
        ]);
    }
}
