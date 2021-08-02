<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Validator;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function guardAccess($callback, $actionName, $defaultValue = NULL)
    {
        $permissions = $this->permissions;

        $allowedPermissions = is_array($permissions) && array_key_exists($actionName, $permissions)
            ? $this->permissions[$actionName]
            : NULL;

        if (is_array($allowedPermissions)) {
            $user = auth()->user();

            if (!$user) return $defaultValue;

            $userPermissions = Arr::pluck($user->getAllPermissions(), 'name');
            $intersections = array_intersect($userPermissions, $allowedPermissions);
            $allowed = count($intersections) > 0;

            return $allowed ? $callback : $defaultValue;
        } else {
            return $callback;
        }
    }

    protected function validateThenProceed($callback, $rules = [], $customMessages = [])
    {
        $result = Validator::make(request()->toArray(), $rules);

        if ($result->fails()) {
            return $this->respondWithFieldErrors($result->errors());
        }

        return $callback();
    }

    protected function findEntityById($repository, $id)
    {
        $result = $repository->findById($id);

        if ($result) {
            return $this->respondWithSuccess($result);
        }

        return $this->respondWithNotFound();
    }

    protected function updateEntityById($repository, $id, $properties)
    {
        $result = $repository->findById($id);

        if ($result) {
            $result->update($properties);

            $updatedEntity = $repository->findById($id);

            return $this->respondWithSuccess($updatedEntity);
        }

        return $this->respondWithNotFound();
    }

    protected function destroyEntityById($repository, $id)
    {
        $result = $repository->delete($id);

        if ($result) {
            return $this->respondWithDeleted('Periode monitoring kinerja');
        }

        return $this->respondWithNotFound();
    }

    protected function respondWithCreated($payload)
    {
        return $this->respondWithSuccess($payload, NULL, 201);
    }

    protected function respondWithDeleted($title = 'Data')
    {
        return $this->respondWithSuccess(NULL, [
            'message' => $title.' berhasil dihapus',
        ]);
    }

    protected function respondWithSuccess($data = NULL, $meta = NULL, $code = 200)
    {
        $payload = [];

        if ($data !== NULL) {
            $payload['data'] =  $data;
        }

        if ($meta !== NULL) {
            $payload['meta'] = $meta;
        }

        return response()->json($payload, $code);
    }

    protected function respondWithBareSuccess($data = NULL, $code = 200)
    {
        return response()->json($data, $code);
    }

    protected function respondWithUnauthorized($message =  'Sesi telah berakhir. Tolong login kembali.')
    {
        return $this->respondWithErrors([$message], 401);
    }

    protected function respondWithNotFound($message =  'Data tidak ditemukan.')
    {
        return $this->respondWithErrors([$message], 404);
    }

    protected function respondWithFieldErrors($errors = ['message' => 'Input salah.'])
    {
        return $this->respondWithErrors($errors, 422);
    }

    protected function respondWithErrors($errors = ['Terjadi kesalahan.'], $code = 400)
    {
        return response()->json([
            'errors' => $errors,
        ], $code);
    }
}
