<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\PerformanceIndicator;

const FIRST_LEVEL_WEIGHT = 4;
const PARENT_COUNT = 4;
const CHILD_COUNT = 4;

class TestPerformanceIndicatorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $indicatorGroups = $this->getIndicatorGroups();
        $templates = $this->getTemplates();

        $this->createFirstLevelIndicators($templates, $indicatorGroups);
        $this->createChildIndicators(2);
        $this->createChildIndicators(3);
    }

    private function createFirstLevelIndicators($templates, $indicatorGroups)
    {
        $now = Carbon::now();

        foreach($templates as $template) {
            foreach ($indicatorGroups as $group) {
                for ($itemIndex = 1; $itemIndex <= PARENT_COUNT; $itemIndex++) {
                    PerformanceIndicator::create([
                        'performance_template_id' => $template->id,
                        'performance_indicator_group_id' => $group->id,
                        'code' => $template->id.'.'.$group->id.'.'.$itemIndex,
                        'indicator' => $group->title.' '.$template->name.' '.$itemIndex,
                        'unit' => '%',
                        'weight' => FIRST_LEVEL_WEIGHT,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ]);
                }
            }
        }
    }

    private function createChildIndicators($level = 2)
    {
        $now = Carbon::now();

        if ($level === 2) {
            $parentIndicators = PerformanceIndicator::whereNull('parent_id')->get();
        } else {
            $parentIndicators = PerformanceIndicator::whereNotNull('parent_id')->get();
        }

        foreach($parentIndicators as $parent) {
            $templateId = $parent->performance_template_id;
            $groupId = $parent->performance_indicator_group_id;
            $parentTitle = $parent->indicator;
            $parentId = $parent->id;
            $parentCode = $parent->code;
            $weight = $level === 2
                ? FIRST_LEVEL_WEIGHT / CHILD_COUNT
                : FIRST_LEVEL_WEIGHT / CHILD_COUNT / CHILD_COUNT;

            for ($itemIndex = 1; $itemIndex <= CHILD_COUNT; $itemIndex++) {
                PerformanceIndicator::create([
                    'performance_template_id' => $templateId,
                    'performance_indicator_group_id' => $groupId,
                    'parent_id' => $parentId,
                    'code' => $parentCode.'.'.$itemIndex,
                    'indicator' => $parentTitle.'.'.$itemIndex,
                    'unit' => '%',
                    'weight' => $weight,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }
    }

    private function getIndicatorGroups()
    {
        return DB::table('performance_indicator_groups')->get();
    }

    public function getTemplates()
    {
        return DB::table('performance_templates')->get();
    }
}
