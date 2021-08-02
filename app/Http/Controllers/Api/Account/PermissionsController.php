<?php

namespace App\Http\Controllers\Api\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\PermissionRepository;
use App\Http\Resources\Permission as PermissionResource;

class PermissionsController extends Controller
{
    protected $permission;

    public function __construct(PermissionRepository $permission)
    {
        $this->permission = $permission;
    }

    public function index()
    {
        return $this->respondWithSuccess(
            PermissionResource::collection($this->permission->findAll())
        );
    }
}
