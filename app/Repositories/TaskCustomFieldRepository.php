<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\TaskCustomField;

class TaskCustomFieldRepository extends BaseRepository
{
    public function __construct(TaskCustomField $taskCustomField)
    {
        $this->model = $taskCustomField;
    }
}
