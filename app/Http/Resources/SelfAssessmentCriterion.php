<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SelfAssessmentCriterion extends JsonResource
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
            'score' => $this->score,
            'level' => $this->level,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'self_assessment_sub_area' => [
                'id' => $this->subArea->id,
                'name' => $this->subArea->name,
            ],
        ];
    }
}
