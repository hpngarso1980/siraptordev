<?php

use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleHasPermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $policies = config('policies.policies');

        foreach ($policies as $roleName => $permissions) {
            $role = Role::where('name', $roleName)->first();

            foreach ($permissions as $permissionName) {
                $permission = Permission::where('name', $permissionName)->first();

                $role->givePermissionTo($permission);
            }
        }
    }
}
