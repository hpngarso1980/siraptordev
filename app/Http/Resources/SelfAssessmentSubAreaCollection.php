<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class SelfAssessmentSubAreaCollection extends ResourceCollection
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
            'data' => $this->collection,
            'meta' => [
                'from' => $this->firstItem(),
                'to' => $this->lastItem(),
                'per_page' => $this->perPage(),
                'total' => $this->total(),
                'path' => $this->path(),
                'current_page' => $this->currentPage(),
                'last_page' => $this->lastPage(),
            ],
            'links' => [
                'first_page_url' => $this->url(1),
                'last_page_url' => $this->url($this->lastPage()),
                'prev_page_url' => $this->previousPageUrl(),
                'next_page_url' => $this->nextPageUrl(),
            ],
        ];
    }
}
