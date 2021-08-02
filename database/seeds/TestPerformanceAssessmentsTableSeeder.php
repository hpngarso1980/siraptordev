<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\PerformanceAssessment;

class TestPerformanceAssessmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = config('enums.performance_assessment_types');
        $indicators = $this->getIndicators();
        $now = Carbon::now();

        foreach($indicators as $indicator) {
            for ($month = 1; $month <= 12; $month++) {
                foreach($types as $key => $typeValue)  {
                    $weight = $indicator->weight;
                    $realization = rand(90 + $month + $typeValue, 94 + $month + $typeValue);
                    $target = 100;
                    $accomplishmentPercentage = ($realization / $target) * 100;
                    $score = $accomplishmentPercentage > 100 ? $weight : $weight * $accomplishmentPercentage / 100;

                    PerformanceAssessment::create([
                        'performance_indicator_id' => $indicator->id,
                        'month' => $month,
                        'target' => $target,
                        'realization' => $realization,
                        'accomplishment_percentage' => $accomplishmentPercentage,
                        'score' => $score,
                        'type' => $typeValue,
                        'note' => 'sample note'.$indicator->id.''.$month.''.$typeValue,
                    ]);
                }
            }
        }
    }

    private function getIndicators()
    {
        return DB::table('performance_indicators')->get();
    }
}
