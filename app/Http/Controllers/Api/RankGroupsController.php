<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\RankGroupRepository;

class RankGroupsController extends Controller
{
    protected $rankGroup;
    protected $properties;

    public function __construct(RankGroupRepository $rankGroup)
    {
        $this->rankGroup = $rankGroup;
        $this->properties = [
            'title' => 'required',
            'order' => 'required|numeric',
            'color' => 'required',
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
            $this->rankGroup->findAll()
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
            $properties = $this->getInput();

            $rankGroup = $this->rankGroup->create($properties);

            return $this->respondWithCreated($rankGroup);
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
        $rankGroup = $this->rankGroup->findById($id);

        if (!$rankGroup) return $this->respondWithNotFound();

        return $this->validateThenProceed(function () use ($id) {
            $properties = $this->getInput();

            $rankGroup = $this->rankGroup->update($id, $properties);

            return $this->respondWithSuccess($rankGroup);
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
        $rankGroup = $this->rankGroup->findById($id);
        $messagePrefix = 'Kelompok ranking "'.$rankGroup->name.'"';

        if (!$rankGroup) return $this->respondWithNotFound();

        try {
            if ($rankGroup->delete($id)) return $this->respondWithDeleted($messagePrefix.' berhasil dihapus');
            return $this->respondWithErrors([$messagePrefix.' gagal dihapus']);
        } catch (QueryException $e) {
            return $this->respondWithErrors([$messagePrefix.' gagal dihapus. Pastikan tidak ada yang menggunakan kelompok ranking ini.']);
        }
    }

    private function getInput()
    {
        $properties = request()->only(array_keys($this->properties));
        return $properties;
    }
}
