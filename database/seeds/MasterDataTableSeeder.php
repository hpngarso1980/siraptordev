<?php

use Illuminate\Database\Seeder;

class MasterDataTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AuthorizationTableSeeder::class);
        $this->call(PerformanceIndicatorGroupsTableSeeder::class);
        $this->call(CustomFieldsTableSeeder::class);
    }
}
