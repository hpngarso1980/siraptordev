<?php

use Illuminate\Database\Seeder;
use App\Models\ManagementActionPlan;
use App\Models\User;

class TestManagementActionPlansTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = factory(User::class)->create([
            'name' => 'Test User',
        ]);
        $actionPlans = [
            [
                'description' => 'Action plan 1',
                'due_date' => '2020-01-01',
                'note' => 'Sample note',
                'status' => 1,
            ],
            [
                'description' => 'Action plan 2',
                'due_date' => '2020-01-01',
                'note' => 'Sample note',
                'status' => 1,
            ],
        ];

        foreach ($actionPlans as $plan) {
            $actionPlan = factory(ManagementActionPlan::class)->create($plan);
            $actionPlan->assignees()->sync([$user->id]);
        }
    }
}
