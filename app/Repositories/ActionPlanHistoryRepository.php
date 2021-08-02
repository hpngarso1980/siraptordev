<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\ActionPlanHistory;

class ActionPlanHistoryRepository extends BaseRepository
{
    public function __construct(ActionPlanHistory $actionPlanHistory)
    {
        $this->model = $actionPlanHistory;
    }
}
