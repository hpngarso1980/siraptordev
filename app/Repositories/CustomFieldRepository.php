<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\CustomField;

class CustomFieldRepository extends BaseRepository
{
    public function __construct(CustomField $customField)
    {
        $this->model = $customField;
    }
}
