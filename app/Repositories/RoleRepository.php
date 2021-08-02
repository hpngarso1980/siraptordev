<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use Spatie\Permission\Models\Role;

class RoleRepository extends BaseRepository
{
    public function __construct(Role $role)
    {
        $this->model = $role;
    }

    public function findAll()
    {
        return $this->model->with('permissions')->get();
    }
}
