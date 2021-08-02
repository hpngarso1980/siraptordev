<?php

use Illuminate\Database\Seeder;
use App\Models\RankGroup;

class TestRankGroupsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rankGroups = [
            [
                'title' => 'Platinum',
                'order' => 1,
                'color' => '#e2e3e5',
            ],
            [
                'title' => 'Gold',
                'order' => 2,
                'color' => '#D6AF36',
            ],
            [
                'title' => 'Silver',
                'order' => 3,
                'color' => '#D7D7D7',
            ],
            [
                'title' => 'Bronze',
                'order' => 4,
                'color' => '#A77044',
            ],
        ];

        foreach($rankGroups as $rankGroup) {
            RankGroup::create($rankGroup);
        }
    }
}
