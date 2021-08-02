<?php

namespace App\Http\Controllers\Api;

use Hash;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Repositories\UserRepository;
use App\Services\ProfileService;
use App\Http\Resources\Notification as NotificationResource;
use App\Http\Resources\User as UserResource;

class ProfileController extends Controller
{
    protected $user;
    protected $profileService;

    public function __construct(UserRepository $userRepository, ProfileService $profileService)
    {
        $this->user = $userRepository;
        $this->profileService = $profileService;
    }

    public function index(Request $request)
    {
        $profile = $request->user()->withAllPermissions();

        return $this->respondWithSuccess(new UserResource($profile));
    }

    public function update(Request $request)
    {
        $userId = $request->user()->id;
        $properties = [
            'name' => 'required|max:500',
            'email' => 'required|max:500|unique:users,email,'.$userId.',id',
            'phone' => 'max:15',
        ];

        return $this->validateThenProceed(function () use ($userId, $properties) {
            $input = request()->only(array_keys($properties));

            $user = $this->user->update($userId, $input);

            return $this->respondWithSuccess(
                new UserResource($user)
            );
        }, $properties);
    }

    public function updatePassword(Request $request)
    {
        $userId = $request->user()->id;
        $properties = [
            'password' => 'required|max:255|confirmed',
        ];

        return $this->validateThenProceed(function () use ($userId, $properties) {
            $password = request()->input('password');

            $user = $this->user->update($userId, [
                'password' => Hash::make($password),
            ]);

            return $this->respondWithSuccess([
                'message' => 'Password berhasil diubah.',
            ]);
        }, $properties);
    }

    public function updatePhoto(Request $request)
    {
        $userId = $request->user()->id;
        $properties = [
            'photo' => 'nullable|file|mimes:jpg,jpeg,png|max:1024',
        ];

        return $this->validateThenProceed(function () use ($userId, $properties) {
            $disk = config('constants.PROFILE_PHOTO_DISK');

            $oldPhotoFileName = $this->user->findById($userId)->photoFileName;

            if (request()->hasFile('photo')) {
                $photo = request()->file('photo');

                $photoPath = $photo->store('', $disk);

                $user = $this->user->update($userId, [
                    'photo' => $photoPath,
                ]);
            } else {
                $user = $this->user->update($userId, [
                    'photo' => NULL,
                ]);
            }

            if ($oldPhotoFileName) {
                Storage::disk($disk)->delete($oldPhotoFileName);
            }

            return $this->respondWithSuccess([
                'message' => 'Foto berhasil diubah.',
            ]);
        }, $properties);
    }

    public function notifications(Request $request)
    {
        $user = $request->user();

        $notifications = $user->notifications;

        return $this->respondWithSuccess(
            NotificationResource::collection($notifications)
        );
    }

    public function markAllNotificationsAsRead(Request $request)
    {
        $user = $request->user();

        $notifications = $user->unreadNotifications->markAsRead();

        return $this->respondWithSuccess([
            'message' => 'Notifikasi berhasil ditandai.',
        ]);
    }

    public function stats(Request $request)
    {
        return $this->respondWithSuccess(
            $this->profileService->getStats()
        );
    }
}
