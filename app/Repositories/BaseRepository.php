<?php

namespace App\Repositories;

use Illuminate\Support\Arr;

class BaseRepository
{
    protected $model;
    protected $fullControlPermissions = [];

    public function findById($id)
    {
        return $this->model->find($id);
    }

    public function findAll()
    {
        return $this->model->all();
    }

    public function paginate($limit)
    {
        return $this->model->paginate($limit);
    }

    public function create($properties)
    {
        return $this->model->create($properties);
    }

    public function update($id, $properties)
    {
        $item = $this->model->find($id);

        if (!$item) return FALSE;

        $item->update($properties);

        return $this->model->find($id);
    }

    public function delete($id)
    {
        $item = $this->model->find($id);

        if (!$item) return FALSE;

        return $item->delete();
    }

    public function model()
    {
        return $this->model;
    }

    protected function hasFullControl()
    {
        $currentUser = request()->user();

        if (!$currentUser) return FALSE;

        return $currentUser->hasAnyPermission($this->fullControlPermissions);
    }
}
