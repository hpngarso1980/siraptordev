<?php

namespace App\Imports;

use App\Models\SelfAssessmentStream;
use App\Models\SelfAssessmentAreaGroup;
use Maatwebsite\Excel\Concerns\ToModel;

class GroupImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new SelfAssessmentAreaGroup([
            //
            'self_assessment_stream_id' => SelfAssessmentStream::getStreamId($row[0]),
            'name' => $row[1],
            'weight' => 0,
        ]);
    }
}
