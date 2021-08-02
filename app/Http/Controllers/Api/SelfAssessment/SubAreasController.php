<?php

namespace App\Http\Controllers\Api\SelfAssessment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\SelfAssessmentSubAreaRepository;
use App\Http\Resources\SelfAssessmentSubAreaCollection;

class SubAreasController extends Controller
{
    protected $selfAssessmentSubArea;
    protected $properties;

    public function __construct(SelfAssessmentSubAreaRepository $selfAssessmentSubArea)
    {
        $this->selfAssessmentSubArea = $selfAssessmentSubArea;
        $this->properties = [
            'name' => 'required',
            'area_id' => 'required',
            'weight' => 'required',
            'score_target' => 'nullable|numeric',
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $areaId = request()->query('area_id', NULL);

        return $this->respondWithBareSuccess(
            new SelfAssessmentSubAreaCollection(
                $this->selfAssessmentSubArea->paginateByArea($areaId, config('constants.PAGINATION_DEFAULT_LIMIT'))
            )
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
            $properties = $this->getSubAreaInput();

            $subArea = $this->selfAssessmentSubArea->create($properties);

            return $this->respondWithCreated($subArea);
        }, $this->properties);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->findEntityById($this->selfAssessmentSubArea, $id);
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
        $subArea = $this->selfAssessmentSubArea->findById($id);

        if (!$subArea) return $this->respondWithNotFound();

        return $this->validateThenProceed(function () use ($id) {
            $properties = $this->getSubAreaInput();

            $subArea = $this->selfAssessmentSubArea->update($id, $properties);

            return $this->respondWithSuccess($subArea);
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
        $subArea = $this->selfAssessmentSubArea->findById($id);
        $messagePrefix = 'Sub Area "'.$subArea->name.'"';

        if (!$subArea) return $this->respondWithNotFound();

        try {
            if ($subArea->delete($id)) return $this->respondWithDeleted($messagePrefix.' berhasil dihapus');
            return $this->respondWithErrors([$messagePrefix.' gagal dihapus']);
        } catch (QueryException $e) {
            return $this->respondWithErrors([$messagePrefix.' gagal dihapus. Pastikan tidak ada yang menggunakan sub area ini.']);
        }
    }

    private function getSubAreaInput()
    {
        $properties = request()->only(array_keys($this->properties));
        $properties['self_assessment_area_id'] = $properties['area_id'];

        unset($properties['area_id']);

        return $properties;
    }
}
