<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\PerformanceIndicatorGroup as PerformanceIndicatorGroupResource;

class PerformanceIndicator extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'parent_id' => $this->parent_id,
            'code' => $this->code,
            'indicator' => $this->indicator,
            'unit' => $this->unit,
            'weight' => $this->weight,
            'indicator_group' => $this->indicatorGroup,
            'children' => $this->formatChildren($this->children),
        ];
    }

    private function formatChildren($children)
    {
        return $children->map(function ($child) {
            $grandChildren = $child->children;
            $hasGrandChildren = $grandChildren->count() > 0;

            return [
                'id' => $child->id,
                'parent_id' => $child->parent_id,
                'code' => $child->code,
                'indicator' => $child->indicator,
                'unit' => $child->unit,
                'weight' => $child->weight,
                'indicator_group' => $child->indicatorGroup,
                'children' => $hasGrandChildren ? $this->formatChildren($grandChildren) : [],
            ];
        });
    }
}
