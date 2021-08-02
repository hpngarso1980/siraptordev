<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Task extends JsonResource
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
            'type' => $this->type,
            'title' => $this->title,
            'description' => $this->description,
            'state' => $this->state,
            'due_date' => $this->due_date,
            'updated_at' => $this->updated_at,
            'finished_at' => $this->finished_at,
            'sub_tasks' => count($this->sub_tasks) > 0 ? Task::collection($this->sub_tasks) : [],
            'assignees' => $this->formatAssignees($this->assignees),
            'custom_fields' => $this->formatCustomFields($this->customFields),
            'attachments' => $this->formatAttachments($this->attachments),
            'attachments_count' => $this->attachments_count,
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

    private function formatCustomFields($customFields)
    {
        $fields = [];

        foreach ($customFields as $field) {
            $fields[$field->name] = [
                'name' => $field->name,
                'title' => $field->title,
                'type' => $field->type,
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

    private function formatAttachments($attachments)
    {
        $basePath = config('constants.TASK_ATTACHMENT_URL');

        return $attachments->map(function($file) use ($basePath) {
            $filePathSegments = explode('/', $file->path);
            $fileName = $filePathSegments[count($filePathSegments) - 1];

            return [
                'id' => $file->id,
                'path' => "$basePath/$file->path",
                'name' => $fileName,
                'created_at' => $file->created_at,
            ];
        });
    }
}
