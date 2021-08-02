<?php

use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Permission;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = config('policies.permissions');

        foreach($permissions as $name) {
            $permission = Permission::where([
                ['name', '=', $name],
                ['guard_name', '=', 'api'],
            ])->first();

            if (!$permission) {
                Permission::create([
                    'name' => $name,
                    'guard_name' => 'api',
                ]);
            }
        }
    }
}
