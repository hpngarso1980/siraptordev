<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\TaskHistory;

class TaskHistoryRepository extends BaseRepository
{
    public function __construct(TaskHistory $taskHistory)
    {
        $this->model = $taskHistory;
    }
}
