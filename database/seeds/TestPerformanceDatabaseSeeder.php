<?php

use Illuminate\Database\Seeder;

class TestPerformanceDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(TestPerformanceTemplatesTableSeeder::class);
        $this->call(TestPerformanceIndicatorsTableSeeder::class);
        $this->call(TestPerformanceAssessmentsTableSeeder::class);
    }
}
