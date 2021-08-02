<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ActionPlanHistory extends JsonResource
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
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'photo' => $this->user->photo,
            ],
            'change_type' => $this->change_type,
            'change_type_displayed' => __("actions.{$this->change_type}"),
            'field_name' => $this->field_name,
            'field_name_displayed' => $this->field_name ? __("fields.{$this->field_name}") : NULL,
            'from' => $this->from,
            'to' => $this->to,
            'created_at' => $this->created_at,
        ];
    }
}
