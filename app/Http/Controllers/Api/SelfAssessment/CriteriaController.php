<?php

namespace App\Http\Controllers\Api\SelfAssessment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\SelfAssessmentCriterionRepository;
use App\Http\Resources\SelfAssessmentCriterionCollection;
use App\Http\Resources\SelfAssessmentCriterion as SelfAssessmentCriterionResource;

class CriteriaController extends Controller
{
    protected $selfAssessmentCriterion;
    protected $properties;

    public function __construct(SelfAssessmentCriterionRepository $selfAssessmentCriterion)
    {
        $this->selfAssessmentCriterion = $selfAssessmentCriterion;
        $this->properties = [
            'score' => 'required|max:45',
            'level' => 'nullable|max:500',
            'description' => 'nullable|max:500',
            'sub_area_id' => 'required|exists:self_assessment_sub_areas,id',
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subAreaId = request()->query('sub_area_id', NULL);

        return $this->respondWithBareSuccess(
            new SelfAssessmentCriterionCollection(
                $this->selfAssessmentCriterion->paginateBySubArea($subAreaId, config('constants.PAGINATION_DEFAULT_LIMIT'))
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
            $properties = $this->getCriterionInput();

            $criterion = $this->selfAssessmentCriterion->create($properties);

            return $this->respondWithCreated(new SelfAssessmentCriterionResource($criterion));
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
        $criterion = $this->selfAssessmentCriterion->findById($id);

        if (!$criterion) return $this->respondWithNotFound();

        return $this->validateThenProceed(function () use ($id) {
            $properties = $this->getCriterionInput();

            $criterion = $this->selfAssessmentCriterion->update($id, $properties);

            return $this->respondWithSuccess(new SelfAssessmentCriterionResource($criterion));
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
        $criterion = $this->selfAssessmentCriterion->findById($id);
        $messagePrefix = 'Kriteria "'.$criterion->score.'"';

        if (!$criterion) return $this->respondWithNotFound();

        try {
            if ($criterion->delete($id)) return $this->respondWithDeleted($messagePrefix.' berhasil dihapus');
            return $this->respondWithErrors([$messagePrefix.' gagal dihapus']);
        } catch (QueryException $e) {
            return $this->respondWithErrors([$messagePrefix.' gagal dihapus. Pastikan tidak ada yang menggunakan sub area ini.']);
        }
    }

    private function getCriterionInput()
    {
        $properties = request()->only(array_keys($this->properties));
        $properties['self_assessment_sub_area_id'] = $properties['sub_area_id'];

        unset($properties['sub_area_id']);

        return $properties;
    }
}
