<?php

use Illuminate\Database\Seeder;
use App\Models\PerformanceActionPlan;
use App\Models\PerformanceTemplate;
use App\Models\User;

class TestPerformanceActionPlansTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::first();

        if (!$user) {
            $user = factory(User::class)->create([
                'name' => 'Test User',
            ]);
        }

        $template = PerformanceTemplate::first();

        if (!$template) {
            $template = factory(PerformanceTemplate::class)->create([
                'name' => '2020',
            ]);
        }

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
            $actionPlan = factory(PerformanceActionPlan::class)->create($plan);
            $actionPlan->assignees()->sync([$user->id]);
            $actionPlan->performanceTemplate()->associate($template);
            $actionPlan->save();
        }
    }
}
