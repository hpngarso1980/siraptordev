<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;
use Tests\ApiHelpers;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\ManagementActionPlan;
use App\Models\User;
use App\Notifications\ManagementActionPlanAssigned;

class ProfileTest extends TestCase
{
    use RefreshDatabase, ApiHelpers;

    protected $baseUrl = '/api/profile';
    protected $profileStructure = [
        'data' => [
            'id',
            'name',
            'email',
            'phone',
            'photo',
            'role' => [
                'id',
                'name',
            ],
            'permissions' => [
                '*' => [
                    'id',
                    'name',
                ],
            ],
        ],
    ];

    public function testGetProfile()
    {
        $data = $this->prepareData();

        $accessToken = $this->getAccessToken($data['user']->email, 'password');

        $response = $this->apiRequest('GET', $this->baseUrl, NULL, $accessToken);

        $response
            ->assertStatus(200)
            ->assertJsonStructure($this->profileStructure)
            ->assertJson([
                'data' => [
                    'id' => $data['user']->id,
                    'name' => $data['user']->name,
                ],
            ]);
    }

    public function testGetProfileWithPhoto()
    {
        $dummyPhoto = 'photo.png';
        $data = $this->prepareData();
        $data['user']->update([
            'photo' => $dummyPhoto,
        ]);

        $accessToken = $this->getAccessToken($data['user']->email, 'password');

        $response = $this->apiRequest('GET', $this->baseUrl, NULL, $accessToken);

        $response
            ->assertStatus(200)
            ->assertJsonStructure($this->profileStructure)
            ->assertJson([
                'data' => [
                    'id' => $data['user']->id,
                    'name' => $data['user']->name,
                    'photo' => config('constants.PROFILE_PHOTO_URL').'/'.$dummyPhoto,
                ],
            ]);
    }

    public function testUpdateProfile()
    {
        $data = $this->prepareData();

        $accessToken = $this->getAccessToken($data['user']->email, 'password');

        $updateData = [
            'name' => 'Updated name',
            'email' => 'updatedemail@mail.com',
            'phone' => '+628100000001',
        ];

        $response = $this->apiRequest('PATCH', $this->baseUrl, $updateData, $accessToken);

        $response
            ->assertStatus(200)
            ->assertJsonStructure($this->profileStructure)
            ->assertJson([
                'data' => $updateData,
            ]);
    }

    public function testUpdatePassword()
    {
        $url = "$this->baseUrl/password";
        $data = $this->prepareData();

        $accessToken = $this->getAccessToken($data['user']->email, 'password');

        $newPassword = 'newpassword';
        $updateData = [
            'password' => $newPassword,
            'password_confirmation' => $newPassword,
        ];

        $response = $this->apiRequest('PATCH', $url, $updateData, $accessToken);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'message' => 'Password berhasil diubah.'
                ],
            ]);

        $newAccessToken = $this->getAccessToken($data['user']->email, $newPassword);

        $this->assertTrue($newAccessToken !== NULL);
    }

    public function testUpdatePhoto()
    {
        Storage::fake('profile_photos');

        $url = "$this->baseUrl/photo";
        $data = $this->prepareData();
        $photo = UploadedFile::fake()->image('photo.png');

        $accessToken = $this->getAccessToken($data['user']->email, 'password');

        $updateData = [
            'photo' => $photo,
        ];

        $response = $this->apiRequest('PUT', $url, $updateData, $accessToken);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'message' => 'Foto berhasil diubah.'
                ],
            ]);

        Storage::disk('profile_photos')->assertExists($photo->hashName());

        $this->assertDatabaseHas('users', [
            'id' => $data['user']->id,
            'photo' => $photo->hashName(),
        ]);
    }

    public function testRemovePhoto()
    {
        Storage::fake('profile_photos');

        $url = "$this->baseUrl/photo";
        $data = $this->prepareData();
        $photo = UploadedFile::fake()->image('photo.png');

        $accessToken = $this->getAccessToken($data['user']->email, 'password');

        $this->apiRequest('PUT', $url, [
            'photo' => $photo,
        ], $accessToken);

        Storage::disk('profile_photos')->assertExists($photo->hashName());
        $this->assertDatabaseHas('users', [
            'id' => $data['user']->id,
            'photo' => $photo->hashName(),
        ]);

        $response = $this->apiRequest('PUT', $url, [
            'photo' => NULL,
        ], $accessToken);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'message' => 'Foto berhasil diubah.'
                ],
            ]);

        $this->assertDatabaseHas('users', [
            'id' => $data['user']->id,
            'photo' => NULL,
        ]);
        Storage::disk('profile_photos')->assertMissing($photo->hashName());
    }

    public function testChangeExistingPhoto()
    {
        Storage::fake('profile_photos');

        $url = "$this->baseUrl/photo";
        $data = $this->prepareData();
        $photo = UploadedFile::fake()->image('photo.png');

        $accessToken = $this->getAccessToken($data['user']->email, 'password');

        $this->apiRequest('PUT', $url, [
            'photo' => $photo,
        ], $accessToken);

        Storage::disk('profile_photos')->assertExists($photo->hashName());
        $this->assertDatabaseHas('users', [
            'id' => $data['user']->id,
            'photo' => $photo->hashName(),
        ]);

        $newPhoto = UploadedFile::fake()->image('newphoto.png');
        $response = $this->apiRequest('PUT', $url, [
            'photo' => $newPhoto,
        ], $accessToken);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'message' => 'Foto berhasil diubah.'
                ],
            ]);

        $this->assertDatabaseHas('users', [
            'id' => $data['user']->id,
            'photo' => $newPhoto->hashName(),
        ]);
        Storage::disk('profile_photos')->assertMissing($photo->hashName());
        Storage::disk('profile_photos')->assertExists($newPhoto->hashName());
    }

    public function testGetNotifications()
    {
        $url = "$this->baseUrl/notifications";
        $data = $this->prepareData();
        $assignor = factory(User::class)->create();
        $actionPlan = factory(ManagementActionPlan::class)->create();

        $data['user']->notify(new ManagementActionPlanAssigned($actionPlan, $assignor));

        $accessToken = $this->getAccessToken($data['user']->email, 'password');

        $response = $this->apiRequest('GET', $url, NULL, $accessToken);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'trigger',
                        'type',
                        'title',
                        'description',
                        'read_at',
                        'created_at',
                    ],
                ],
            ])
            ->assertJson([
                'data' => [
                    [
                        'trigger' => [
                            'id' => $assignor->id,
                            'name' => $assignor->name,
                        ],
                        'description' => $actionPlan->description,
                    ],
                ],
            ]);
    }

    private function prepareData()
    {
        $role = factory(Role::class)->create();
        $permission = factory(Permission::class)->create();
        $user = factory(User::class)->create();

        $role->givePermissionTo($permission);
        $user->assignRole($role);

        return [
            'role' => $role,
            'permission' => $permission,
            'user' => $user,
        ];
    }
}
