<?php

namespace App\Services\SelfAssessment;

use Arr;
use Maatwebsite\Excel\Excel;
use App\Imports\AreaGroupImport;

class StreamService
{
    protected $excel;

    public function __construct(Excel $excel)
    {
        $this->excel = $excel;
    }

    public function importAreasFromExcel($file)
    {
        $sheets = $this->excel->toArray(new AreaGroupImport, $file);
        $areaGroups = [];
        $currentAreaGroupIndex = 0;
        $currentAreaIndex = 0;
        $currentSubAreaIndex = 0;
        $currentCriteriaIndex = 0;

        foreach ($sheets as $collection) {
            $hasSubAreaCode = FALSE;

            foreach ($collection as $row)
            {
                $areaSegments = explode(PHP_EOL, Arr::get($row, 'area'));
                $areaTitle = $areaSegments[0] ?: NULL;
                $subAreaSegments = explode(PHP_EOL, Arr::get($row, 'sub_area'));
                $subAreaTitle = array_shift($subAreaSegments) ?: NULL;
                $subAreaDescription = count($subAreaSegments) > 0 ? implode(PHP_EOL, $subAreaSegments) : NULL;
                $subAreaCode = $this->cleanString(Arr::get($row, 'no_sub_area'));
                $hasSubAreaCode = $subAreaCode ? TRUE : $hasSubAreaCode;

                if (strtolower($areaTitle) === 'total') {
                    continue;
                }

                if (!$subAreaTitle && $areaTitle) {
                    $subAreaTitle = $areaTitle;
                }

                if (
                    (preg_match('/^deskripsi/i', $subAreaTitle))
                    || ($hasSubAreaCode && !$subAreaCode)
                ) {
                    $subAreaDescription = $subAreaTitle."\n".implode(PHP_EOL, $subAreaSegments);
                    $subAreaTitle = NULL;
                }

                $rowData = [
                    'area_group_name' => $this->cleanString(Arr::get($row, 'area_group')),
                    'area_group_weight' => $this->cleanNumber(Arr::get($row, 'bobot_area_group')),
                    'area_name' => $this->cleanString($areaTitle),
                    'sub_area_code' => $subAreaCode,
                    'sub_area_name' => $this->cleanString($subAreaTitle),
                    'sub_area_description' => $this->cleanString($subAreaDescription),
                    'sub_area_weight' => $this->cleanNumber(Arr::get($row, 'bobot')),
                    'criteria_score' => $this->cleanScoreRange(Arr::get($row, 'nilai')),
                    'criteria_level' => $this->cleanString(Arr::get($row, 'level')),
                    'criteria_description' => $this->cleanString(Arr::get($row, 'uraian')),
                ];


                if ($rowData['area_group_name']) {
                    array_push($areaGroups, [
                        'name' => $rowData['area_group_name'],
                        'weight' => $rowData['area_group_weight'],
                        'areas' => [],
                    ]);
                    $currentAreaGroupIndex = count($areaGroups) - 1;
                }

                if ($rowData['area_name']) {
                    array_push($areaGroups[$currentAreaGroupIndex]['areas'], [
                        'name' => $rowData['area_name'],
                        'sub_areas' => [],
                    ]);
                    $currentAreaIndex = count($areaGroups[$currentAreaGroupIndex]['areas']) - 1;
                }

                if ($rowData['sub_area_name']) {
                    array_push($areaGroups[$currentAreaGroupIndex]['areas'][$currentAreaIndex]['sub_areas'], [
                        'name' => $rowData['sub_area_name'],
                        'weight' => $rowData['sub_area_weight'],
                        'description' => '',
                        'criteria' => []
                    ]);
                    $currentSubAreaIndex = count($areaGroups[$currentAreaGroupIndex]['areas'][$currentAreaIndex]['sub_areas']) - 1;
                }

                if (!$rowData['sub_area_name'] && $rowData['sub_area_description']) {
                    $areaGroups[$currentAreaGroupIndex]['areas'][$currentAreaIndex]['sub_areas'][$currentSubAreaIndex]['description'] .= $rowData['sub_area_description']."\n";
                }

                if ($rowData['criteria_score'] || $rowData['criteria_level']) {
                    array_push($areaGroups[$currentAreaGroupIndex]['areas'][$currentAreaIndex]['sub_areas'][$currentSubAreaIndex]['criteria'], [
                        'score' => $rowData['criteria_score'],
                        'level' => $rowData['criteria_level'],
                        'description' => $rowData['criteria_description'],
                    ]);
                }
            }
        }

        return $areaGroups;
    }

    private function cleanNumber($string)
    {
        $cleanText = $this->cleanString($string);

        if (preg_match('/^=/', $string) && !preg_match('/SUM/', $string)) {
            $expression = str_replace('=', '', $string);
            $evalExpression = "return (float)".$expression.";";
            return round(eval($evalExpression), 2);
        } else {
            return round((float) $cleanText, 2);
        }
    }

    private function cleanString($string)
    {
        return trim(preg_replace('/\s\s+/', ' ', str_replace("\n", " ", $string)));
    }

    private function cleanScoreRange($string)
    {
        return preg_replace('/undefined/', '', preg_replace('/[^\<\x\≤0-9a-zA-Z]/', '', $string));
    }
}
