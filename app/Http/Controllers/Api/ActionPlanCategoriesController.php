<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\ActionPlanCategoryRepository;

class ActionPlanCategoriesController extends Controller
{
    protected $actionPlanCategory;
    protected $properties;

    public function __construct(ActionPlanCategoryRepository $actionPlanCategory)
    {
        $this->actionPlanCategory = $actionPlanCategory;
        $this->properties = [
            'name' => 'required',
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->respondWithSuccess(
            $this->actionPlanCategory->findAll()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->validateThenProceed(function () {
            $properties = $this->getActionPlanCategoryInput();

            $actionPlanCategory = $this->actionPlanCategory->create($properties);

            return $this->respondWithCreated($actionPlanCategory);
        }, $this->properties);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $actionPlanCategory = $this->actionPlanCategory->findById($id);

        if (!$actionPlanCategory) return $this->respondWithNotFound();

        return $this->validateThenProceed(function () use ($id) {
            $properties = $this->getActionPlanCategoryInput();

            $actionPlanCategory = $this->actionPlanCategory->update($id, $properties);

            return $this->respondWithSuccess($actionPlanCategory);
        }, $this->properties);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $actionPlanCategory = $this->actionPlanCategory->findById($id);
        $messagePrefix = 'Kategori "'.$actionPlanCategory->name.'"';

        if (!$actionPlanCategory) return $this->respondWithNotFound();

        try {
            if ($actionPlanCategory->delete($id)) return $this->respondWithDeleted($messagePrefix.' berhasil dihapus');
            return $this->respondWithErrors([$messagePrefix.' gagal dihapus']);
        } catch (QueryException $e) {
            return $this->respondWithErrors([$messagePrefix.' gagal dihapus. Pastikan tidak ada yang menggunakan kategori ini.']);
        }
    }

    private function getActionPlanCategoryInput()
    {
        return request()->only(array_keys($this->properties));
    }
}
