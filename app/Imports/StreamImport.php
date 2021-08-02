<?php

namespace App\Imports;

use App\Models\SelfAssessmentStream;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class StreamImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new SelfAssessmentStream([
            //
            'name' => $row[0],
        ]);
    }
}
