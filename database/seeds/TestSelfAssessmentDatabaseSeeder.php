<?php

use Illuminate\Database\Seeder;

class TestSelfAssessmentDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(TestSelfAssessmentStreamsTableSeeder::class);
        $this->call(TestSelfAssessmentAreaGroupsTableSeeder::class);
        $this->call(TestSelfAssessmentAreasTableSeeder::class);
        $this->call(TestSelfAssessmentSubAreasTableSeeder::class);
        $this->call(TestSelfAssessmentCriteriaTableSeeder::class);
        $this->call(TestSelfAssessmentProjectsSeeder::class);
    }
}
