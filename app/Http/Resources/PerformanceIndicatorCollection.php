<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\PerformanceIndicator as PerformanceIndicatorResource;
use App\Models\PerformanceIndicatorGroup;

class PerformanceIndicatorCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->groupIndicators($this->collection);
    }

    private function groupIndicators($collection)
    {
        $indicatorGroups = PerformanceIndicatorGroup::all();
        $groups = [];
        $indexes = [];

        foreach($indicatorGroups as $index => $group) {
            array_push($groups, [
                'id' => $group->id,
                'title' => $group->title,
                'slug' => $group->slug,
                'deduction' => $group->deduction,
                'indicators' => [],
            ]);

            $indexes[$group->id] = $index;
        }

        foreach ($collection->all() as $indicator) {
            $indicatorGroup = $indicator->indicatorGroup;
            $groupId = $indicatorGroup->id;
            $groupIndex = $indexes[$groupId];

            array_push($groups[$groupIndex]['indicators'], new PerformanceIndicatorResource($indicator));
        }

        return $groups;
    }
}
