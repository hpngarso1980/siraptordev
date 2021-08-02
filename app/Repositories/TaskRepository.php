<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\Task;
class TaskRepository extends BaseRepository
{
    public function __construct(Task $task)
    {
        $this->model = $task;
    }

    public function findByEpicId($epicId)
    {
        $types = config('enums.task_types');
        $tasks = $this->model
            ->select(['id', 'parent_id', 'epic_id', 'type', 'title', 'state', 'due_date'])
            ->withCount(['attachments'])
            ->with([
                'assignees' => function ($query) {
                    return $query->select('name');
                },
                'customFields' => function ($query) {
                    return $query
                        ->select(['name', 'value'])
                        ->where('name', '=', 'weight');
                },
            ])
            ->where(['epic_id' => $epicId])->get();

        $streams = [];
        $areaGroups = [];
        $areas = [];

        foreach ($tasks as $task) {
            switch ($task->type) {
                case $types['stream']:
                    array_push($streams, $task);
                    break;
                case $types['area_group']:
                    array_push($areaGroups, $task);
                    break;
                case $types['area']:
                    array_push($areas, $task);
                    break;
                case $types['sub_area']:
                    $areaIndex = array_search($task->parent_id, array_column($areas, 'id'));
                    array_push($areas[$areaIndex]->sub_tasks, $task);
                    break;
                default:
                    break;
            }
        }

        foreach ($areas as $task) {
            $areaGroupIndex = array_search($task->parent_id, array_column($areaGroups, 'id'));
            array_push($areaGroups[$areaGroupIndex]->sub_tasks, $task);
        }

        foreach ($areaGroups as $task) {
            $streamIndex = array_search($task->parent_id, array_column($streams, 'id'));
            array_push($streams[$streamIndex]->sub_tasks, $task);
        }

        return $streams;

    }

    public function findById($id)
    {
        return $this->model
            ->withCount(['attachments'])
            ->with([
                'assignees' => function ($query) {
                    return $query->select(['id', 'name']);
                },
                'customFields' => function ($query) {
                    return $query->select(['type', 'name', 'title', 'value']);
                },
                'attachments',
            ])
            ->find($id);
    }
}
