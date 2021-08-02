<?php

namespace App\Http\Controllers\Api\Account;

use Arr;
use Hash;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\UserRepository;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\UserCollection;

class UsersController extends Controller
{
    protected $user;
    protected $properties;

    public function __construct(UserRepository $user)
    {
        $this->user = $user;
        $this->properties = [
            'name' => 'required|max:500',
            'email' => 'required|max:500|unique:users,email',
            'phone' => 'max:15',
            'role' => 'exists:roles,name',
            'permissions' => 'exists:permissions,name',
            'password' => 'nullable',
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->respondWithBareSuccess(
            new UserCollection($this->user->paginate(config('constants.PAGINATION_DEFAULT_LIMIT')))
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->validateThenProceed(function () {
            $properties = $this->getUserInput();

            $initialPassword = $properties['password'] ?: 'password';
            $properties['password'] = Hash::make($initialPassword);

            $user = $this->user->create($properties);

            $user = $this->syncAccessControl($user);

            return $this->respondWithCreated(new UserResource($user));
        }, $this->properties);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = $this->user->findById($id);

        if (!$user) return $this->respondWithNotFound();

        return $this->respondWithSuccess(new UserResource($user));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = $this->user->findById($id);

        if (!$user) return $this->respondWithNotFound();

        $rules = $this->properties;
        $rules['email'] = $rules['email'].','.$id;

        return $this->validateThenProceed(function () use ($id) {
            $properties = $this->getUserInput();

            if (array_key_exists('password', $properties)) {
                if (!$properties['password']) {
                    unset($properties['password']);
                } else {
                    $properties['password'] = Hash::make($properties['password']);
                }
            }

            $user = $this->user->update($id, $properties);

            $user = $this->syncAccessControl($user);

            return $this->respondWithSuccess(new UserResource($user));
        }, $rules);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = $this->user->findById($id);

        if (!$user) return $this->respondWithNotFound();

        if ($user->delete($id)) return $this->respondWithDeleted('User '.$user->name.' berhasil dihapus');

        return $this->respondWithErrors(['User '.$user->name.' gagal dihapus']);
    }

    private function syncAccessControl($user)
    {
        $roles = $this->getRolesInput();
        $permissions = $this->getPermissionsInput();

        $user->syncRoles($roles);
        $user->syncPermissions($permissions);

        return $user->withAllPermissions();
    }

    private function getUserInput()
    {
        return request()->only(
            array_keys(Arr::except($this->properties, ['role', 'permissions']))
        );
    }

    private function getRolesInput()
    {
        $role = request()->input('role', NULL);

        return $role ? [$role] : [];
    }

    private function getPermissionsInput()
    {
        return request()->input('permissions', []);
    }
}
