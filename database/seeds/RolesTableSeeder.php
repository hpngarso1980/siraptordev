<?php

use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = config('policies.roles');

        foreach($roles as $name) {
            $role = Role::where([
                ['name', '=', $name],
                ['guard_name', '=', 'api'],
            ])->first();

            if (!$role) {
                Role::create([
                    'name' => $name,
                    'guard_name' => 'api',
                ]);
            }
        }
    }
}
