<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\RankGroup;

class RankGroupRepository extends BaseRepository
{
    public function __construct(RankGroup $rankGroup)
    {
        $this->model = $rankGroup;
    }

    public function findAll()
    {
        return $this->model->orderBy('order', 'asc')->get();
    }
}
