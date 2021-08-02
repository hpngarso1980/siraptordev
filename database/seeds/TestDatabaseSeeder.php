<?php

use Illuminate\Database\Seeder;

class TestDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(TestManagementActionPlansTableSeeder::class);
        $this->call(TestPerformanceDatabaseSeeder::class);
        // $this->call(TestSelfAssessmentDatabaseSeeder::class);
        $this->call(TestUsersTableSeeder::class);
        $this->call(TestRankGroupsTableSeeder::class);
    }
}
