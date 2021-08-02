<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\PerformanceTemplate;

class TestPerformanceTemplatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now();

        for ($year = $now->year; $year <= $now->year + 3; $year++) {
            PerformanceTemplate::create([
                'name' => $year,
            ]);
        }
    }
}
