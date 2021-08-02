<?php

namespace App\Http\Controllers\Api\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\RoleRepository;
use App\Http\Resources\Role as RoleResource;

class RolesController extends Controller
{
    protected $role;

    public function __construct(RoleRepository $role)
    {
        $this->role = $role;
    }

    public function index()
    {
        return $this->respondWithSuccess(
            RoleResource::collection($this->role->findAll())
        );
    }
}
