<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\EpicHistory;

class EpicHistoryRepository extends BaseRepository
{
    public function __construct(EpicHistory $epicHistory)
    {
        $this->model = $epicHistory;
    }
}
