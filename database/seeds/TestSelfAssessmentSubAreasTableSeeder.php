<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\SelfAssessmentSubArea;
use App\Models\SelfAssessmentArea;

class TestSelfAssessmentSubAreasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $areas = SelfAssessmentArea::all();

        foreach($areas as $area) {
            $subAreas = [];

            for ($i = 0; $i < 10; $i++) {
                $subAreaNumber = $i + 1;

                array_push($subAreas, [
                    'name' => "Sub Area $subAreaNumber $area->name",
                    'weight' => 0.1,
                    'score_target' => rand(3, 4),
                ]);
            }

            $area->subAreas()->createMany($subAreas);
        }
    }
}
