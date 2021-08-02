<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\ActionPlanCategory;

class ActionPlanCategoryRepository extends BaseRepository
{
    public function __construct(ActionPlanCategory $actionPlanCategory)
    {
        $this->model = $actionPlanCategory;
    }
}
