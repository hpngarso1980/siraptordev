<?php

use Illuminate\Database\Seeder;

use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = config('policies.roles');
        $users = [
            [
                'user' => [
                    'name' => 'Super Admin',
                    'email' => 'superadmin@mail.com',
                    'password' => Hash::make('superadmin'),
                ],
                'role' => $roles['ADMIN'],
            ],
        ];

        foreach ($users as $item) {
            $user = User::create($item['user']);

            if ($item['role']) {
                $user->assignRole($item['role']);
            }
        }
    }
}
