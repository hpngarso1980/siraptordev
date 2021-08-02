<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SelfAssessmentActionPlan extends JsonResource
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
            'description' => $this->description,
            'due_date' => $this->due_date,
            'note' => $this->note,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'finished_at' => $this->finished_at,
            'epic' => $this->epic ? [
                'id' => $this->epic->id,
                'title' => $this->epic->title,
            ] : NULL,
            'category' => $this->category ? [
                'id' => $this->category->id,
                'name' => $this->category->name,
            ] : NULL,
            'streams' => $this->formatList($this->streams),
            'areas' => $this->formatList($this->areas),
            'sub_areas' => $this->formatList($this->subAreas),
            'assignees' => $this->formatList($this->assignees),
        ];
    }

    private function formatAssignees($assignees)
    {
        return $assignees->map(function($assignee) {
            return [
                'id' => $assignee->id,
                'name' => $assignee->name,
            ];
        });
    }

    private function formatList($actionPlanableItems = [])
    {
        if (!$actionPlanableItems || !count($actionPlanableItems)) return [];

        return $actionPlanableItems->map(function($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
            ];
        });
    }
}
