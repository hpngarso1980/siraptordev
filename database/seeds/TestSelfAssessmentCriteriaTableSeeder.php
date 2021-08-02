<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\SelfAssessmentCriterion;
use App\Models\SelfAssessmentSubArea;

class TestSelfAssessmentCriteriaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subAreas = SelfAssessmentSubArea::all();

        foreach($subAreas as $subArea) {
            $criteria = [
                [
                    'score' => '≤ 1',
                    'level' => "$subArea->name. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    'description' => "$subArea->name. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non elit molestie nisi luctus lacinia sed et magna. Proin rhoncus elementum sem, non lacinia velit auctor in.",
                ],
                [
                    'score' => '1 < x ≤ 2',
                    'level' => "$subArea->name. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    'description' => "$subArea->name. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non elit molestie nisi luctus lacinia sed et magna. Proin rhoncus elementum sem, non lacinia velit auctor in.",
                ],
                [
                    'score' => '2 < x ≤ 4',
                    'level' => "$subArea->name. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    'description' => "$subArea->name. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non elit molestie nisi luctus lacinia sed et magna. Proin rhoncus elementum sem, non lacinia velit auctor in.",
                ],
            ];

            $subArea->criteria()->createMany($criteria);
        }
    }
}
