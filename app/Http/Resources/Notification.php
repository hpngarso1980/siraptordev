<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Notification extends JsonResource
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
            'trigger' => $this->data['trigger'],
            'type' => $this->data['type'],
            'title' => $this->data['title'],
            'description' => $this->data['description'],
            'data' => array_key_exists('data', $this->data)
                ? $this->data['data']
                : NULL,
            'read_at' => $this->read_at,
            'created_at' => $this->created_at,
        ];
    }
}
