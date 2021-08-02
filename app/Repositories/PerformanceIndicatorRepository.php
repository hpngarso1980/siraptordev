<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\PerformanceIndicator;

class PerformanceIndicatorRepository extends BaseRepository
{
    public function __construct(PerformanceIndicator $performanceIndicator)
    {
        $this->model = $performanceIndicator;
    }

    public function findByTemplateId($templateId, $id)
    {
        return $this->model
            ->where('performance_template_id', $templateId)
            ->where('id', $id)
            ->first();
    }

    public function findAllByTemplateId($templateId)
    {
        return $this->model
            ->with([
                'indicatorGroup',
                'children' => function($query) {
                    $query->with([
                        'indicatorGroup',
                        'children' => function($grandChildQuery) {
                            $grandChildQuery->with(['indicatorGroup']);
                        }
                    ]);
                }
            ])
            ->where('performance_template_id', $templateId)
            ->whereNull('parent_id')
            ->get();
    }

    public function updateByTemplateId($templateId, $id, $properties)
    {
        $entity = $this->findByTemplateId($templateId, $id);

        if (!$entity) return FALSE;

        $entity->update($properties);

        $newEntity = $this->findByTemplateId($templateId, $id);

        return $newEntity;
    }

    public function bulkDeleteByIds($ids = [])
    {
        return $this->model->destroy($ids);
    }

    public function deleteByTemplateId($templateId, $id)
    {
        $entity = $this->findByTemplateId($templateId, $id);

        if (!$entity) return FALSE;

        return $entity->delete();
    }
}
