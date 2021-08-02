<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\SelfAssessmentAreaGroup;
use App\Models\SelfAssessmentStream;

class TestSelfAssessmentAreasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $areaGroups = SelfAssessmentAreaGroup::all();

        foreach($areaGroups as $areaGroup) {
            $areas = [];

            for ($i = 0; $i < 5; $i++) {
                $areaNumber = $i + 1;

                array_push($areas, [
                    'name' => "Area $areaNumber $areaGroup->name",
                    'score_target' => rand(3, 4),
                ]);
            }

            $areaGroup->areas()->createMany($areas);
        }
    }
}
