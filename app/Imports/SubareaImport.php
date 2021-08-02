<?php

namespace App\Imports;

use App\Models\SelfAssessmentArea;
use App\Models\SelfAssessmentSubArea;
use Maatwebsite\Excel\Concerns\ToModel;

class SubareaImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new SelfAssessmentSubArea([
            //
            'self_assessment_area_id' => SelfAssessmentArea::getAreaId($row[0],$row[1],$row[2]),
            'name' => $row[3],
        ]);
    }
}
