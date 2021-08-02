<?php

namespace App\Repositories;

use DB;
use App\Repositories\BaseRepository;
use App\Models\CustomField;
use App\Models\Epic;
class EpicRepository extends BaseRepository
{
    public function __construct(Epic $epic)
    {
        $this->model = $epic;
    }

    public function summarizeSelfAssessmentEpic($epicId)
    {
        $scoreField = CustomField::select(['id'])->where('name', 'score')->first();
        $weightField = CustomField::select(['id'])->where('name', 'weight')->first();
        $scoreTargetField = CustomField::select(['id'])->where('name', 'score_target')->first();
        $epic = $this->model->find($epicId);
        $startDateQuery = $epic && $epic->start_date
            ? "(select '$epic->start_date') as start_date"
            : "(select NULL) as start_date";

        if (!($scoreField && $weightField)) return NULL;

        return DB::table('tasks')
            ->select(DB::raw("
                tasks.id, tasks.parent_id, tasks.type, tasks.state, tasks.title, tasks.due_date, tasks.finished_at,
                $startDateQuery,
                (select value from task_custom_fields where custom_field_id = $weightField->id and task_id = tasks.id) as weight,
                (select value from task_custom_fields where custom_field_id = $scoreField->id and task_id = tasks.id) as score,
                (select value from task_custom_fields where custom_field_id = $scoreTargetField->id and task_id = tasks.id) as score_target,
                (select count(task_id) from task_attachments where task_id = tasks.id) as attachment_count
            "))
            ->where('epic_id', $epicId)
            ->get();
    }
}
