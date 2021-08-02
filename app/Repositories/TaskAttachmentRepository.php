<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\TaskAttachment;

class TaskAttachmentRepository extends BaseRepository
{
    public function __construct(TaskAttachment $taskAttachment)
    {
        $this->model = $taskAttachment;
    }
}
