<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\SelfAssessmentStream;

class TestSelfAssessmentAreaGroupsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $streams = SelfAssessmentStream::all();

        foreach($streams as $stream) {
            $areaGroups = [];

            for ($i = 0; $i < 2; $i++) {
                $areaGroupNumber = $i + 1;

                array_push($areaGroups, [
                    'name' => "Group $areaGroupNumber $stream->name",
                    'weight' => 0.5,
                ]);
            }

            $stream->areaGroups()->createMany($areaGroups);
        }
    }
}
