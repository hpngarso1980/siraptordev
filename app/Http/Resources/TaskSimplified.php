<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskSimplified extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'title' => $this->title,
            'state' => $this->state,
            'due_date' => $this->due_date,
            'sub_tasks' => count($this->sub_tasks) > 0 ? TaskSimplified::collection($this->sub_tasks) : [],
            'assignees' => $this->formatAssignees($this->assignees),
            'custom_fields' => $this->formatCustomFields($this->customFields),
            'attachments_count' => $this->attachments_count,
        ];
    }

    private function formatAssignees($assignees)
    {
        return $assignees->map(function($assignee) {
            return [
                'name' => $assignee->name,
            ];
        });
    }

    private function formatCustomFields($customFields)
    {
        $fields = [];

        foreach ($customFields as $field) {
            $fields[$field->name] = [
                'value' => $this->getFormattedFieldValue($field),
            ];
        }

        return count(array_keys($fields)) > 0 ? $fields : NULL;
    }

    private function getFormattedFieldValue($field)
    {
        $value = $field->pivot->value;
        $type = $field->type;

        if ($value && $type === 'number') return floatval($value);

        return $value;
    }
}
