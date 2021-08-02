<?php

use Illuminate\Database\Seeder;

use App\Models\User;

class TestUsersTableSeeder extends Seeder
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
                    'name' => 'Supervisor 1',
                    'email' => 'supervisor1@mail.com',
                    'password' => Hash::make('password'),
                ],
                'role' => $roles['SUPERVISOR'],
            ],
            [
                'user' => [
                    'name' => 'Supervisor 2',
                    'email' => 'supervisor2@mail.com',
                    'password' => Hash::make('password'),
                ],
                'role' => $roles['SUPERVISOR'],
            ],
            [
                'user' => [
                    'name' => 'Assessor Staff 1',
                    'email' => 'assessor_staff1@mail.com',
                    'password' => Hash::make('password'),
                ],
                'role' => $roles['ASSESSOR_STAFF'],
            ],
            [
                'user' => [
                    'name' => 'Assessor Staff 2',
                    'email' => 'assessor_staff2@mail.com',
                    'password' => Hash::make('password'),
                ],
                'role' => $roles['ASSESSOR_STAFF'],
            ],
            [
                'user' => [
                    'name' => 'Staff 1',
                    'email' => 'staff1@mail.com',
                    'password' => Hash::make('password'),
                ],
                'role' => $roles['STAFF'],
            ],
            [
                'user' => [
                    'name' => 'Staff 2',
                    'email' => 'staff2@mail.com',
                    'password' => Hash::make('password'),
                ],
                'role' => $roles['STAFF'],
            ],
            [
                'user' => [
                    'name' => 'Management 1',
                    'email' => 'management1@mail.com',
                    'password' => Hash::make('password'),
                ],
                'role' => $roles['MANAGEMENT'],
            ],
            [
                'user' => [
                    'name' => 'Management 2',
                    'email' => 'management2@mail.com',
                    'password' => Hash::make('password'),
                ],
                'role' => $roles['MANAGEMENT'],
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
