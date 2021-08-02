<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class PerformanceIndicatorGroupsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $groups = [
            [
                'title' => 'Kinerja Hasil',
                'slug' => 'result-performance',
                'deduction' => FALSE,
            ],
            [
                'title' => 'Kinerja Proses',
                'slug' => 'process-performance',
                'deduction' => FALSE,
            ],
            [
                'title' => 'Nilai Pengurang',
                'slug' => 'deduction-item',
                'deduction' => TRUE,
            ],
        ];
        $groupsWithTimestamp = array_map(function ($item) {
            $now = Carbon::now();

            return [
                'title' => $item['title'],
                'slug' =>$item['slug'],
                'deduction' => $item['deduction'],
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }, $groups);

        DB::table('performance_indicator_groups')->insert($groupsWithTimestamp);
    }
}
