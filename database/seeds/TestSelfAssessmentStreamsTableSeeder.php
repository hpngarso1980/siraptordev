<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\SelfAssessmentStream;

class TestSelfAssessmentStreamsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 5; $i++) {
            $streamNumber = $i + 1;

            SelfAssessmentStream::create([
                'name' => "Stream $streamNumber",
                'score_target' => rand(3, 4),
            ]);
        }
    }
}
