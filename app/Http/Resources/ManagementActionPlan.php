<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ManagementActionPlan extends JsonResource
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
            'assignees' => $this->formatAssignees($this->assignees),
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
}
