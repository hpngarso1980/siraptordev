<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'photo' => $this->photo,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'role' => $this->formatRole($this->roles),
            'permissions' => $this->formatPermissions($this->all_permissions),
        ];
    }

    private function formatRole($roles)
    {
        if (!$roles || count($roles) === 0) return NULL;

        $role = $roles[0];

        return [
            'id' => $role->id,
            'name' => $role->name,
        ];
    }

    private function formatPermissions($permissions)
    {
        if (!$permissions) return NULL;

        return $permissions->map(function($permission) {
            return [
                'id' => $permission->id,
                'name' => $permission->name,
            ];
        });
    }
}
