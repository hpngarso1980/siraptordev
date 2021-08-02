<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CustomFieldsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fields = [
            [
                'title' => 'Bobot',
                'name' => 'weight',
                'type' => 'number',
            ],
            [
                'title' => 'Catatan',
                'name' => 'note',
                'type' => 'textarea',
            ],
            [
                'title' => 'Catatan Penilai',
                'name' => 'assessor_note',
                'type' => 'textarea',
            ],
            [
                'title' => 'Target',
                'name' => 'score_target',
                'type' => 'number',
            ],
            [
                'title' => 'Nilai',
                'name' => 'score',
                'type' => 'number',
            ],
        ];
        $fieldsWithTimestamp = array_map(function ($item) {
            $now = Carbon::now();

            return array_merge($item, [
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }, $fields);

        DB::table('custom_fields')->insert($fieldsWithTimestamp);
    }
}
