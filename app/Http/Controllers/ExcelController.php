<?php

namespace App\Http\Controllers;

use App\Imports\Criteria;
use App\Imports\AreaImport;
use App\Imports\GroupImport;
use Illuminate\Http\Request;
use App\Imports\StreamImport;
use App\Imports\SubareaImport;
use Maatwebsite\Excel\Facades\Excel;

class ExcelController extends Controller
{
    //
    /**
    * @return \Illuminate\Support\Collection
    */
    public function excelimport(request $request)
    {
        return view('excel-import');
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function streamImport()
    {
        Excel::import(new StreamImport, $request->file('file')->store('temp'));
        return back();
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function groupImport()
    {
        Excel::import(new GroupImport, $request->file('file')->store('temp'));
        return back();
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function areaImport()
    {
        Excel::import(new AreaImport, $request->file('file')->store('temp'));
        return back();
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function subareaImport()
    {
        Excel::import(new SubareaImport, $request->file('file')->store('temp'));
        return back();
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function criteriaImport()
    {
        Excel::import(new Criteria, $request->file('file')->store('temp'));
        return back();
    }
}
