<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\WithHeadingRow;
class AreaGroupImport implements WithHeadingRow
{
    public function headingRow(): int
    {
        return 6;
    }
}
