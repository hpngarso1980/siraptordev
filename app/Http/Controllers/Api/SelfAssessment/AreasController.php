<?php

namespace App\Http\Controllers\Api\SelfAssessment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\SelfAssessmentAreaRepository;
use App\Http\Resources\SelfAssessmentArea as SelfAssessmentAreaResource;

class AreasController extends Controller
{
    protected $selfAssessmentArea;
    protected $properties;

    public function __construct(SelfAssessmentAreaRepository $selfAssessmentArea)
    {
        $this->selfAssessmentArea = $selfAssessmentArea;
        $this->properties = [
            'name' => 'required',
            'score_target' => 'nullable|numeric',
            'area_group_id' => 'required',
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $streamId = request()->query('stream_id', NULL);
        $areaGroupId = request()->query('area_group_id', NULL);
        $result = $streamId
            ? $this->selfAssessmentArea->findAllByStreamId($streamId)
            : $this->selfAssessmentArea->findAllByAreaGroupId($areaGroupId);

        return $this->respondWithSuccess(
            SelfAssessmentAreaResource::collection($result)
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
            $properties = $this->getAreaInput();

            $area = $this->selfAssessmentArea->create($properties);

            return $this->respondWithCreated($area);
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
        $area = $this->selfAssessmentArea->findById($id);

        if (!$area) return $this->respondWithNotFound();

        return $this->validateThenProceed(function () use ($id) {
            $properties = $this->getAreaInput();

            $area = $this->selfAssessmentArea->update($id, $properties);

            return $this->respondWithSuccess($area);
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
        $area = $this->selfAssessmentArea->findById($id);
        $messagePrefix = 'Area "'.$area->name.'"';

        if (!$area) return $this->respondWithNotFound();

        try {
            if ($area->delete($id)) return $this->respondWithDeleted($messagePrefix.' berhasil dihapus');
            return $this->respondWithErrors([$messagePrefix.' gagal dihapus']);
        } catch (QueryException $e) {
            return $this->respondWithErrors([$messagePrefix.' gagal dihapus. Pastikan tidak ada yang menggunakan area ini.']);
        }
    }

    private function getAreaInput()
    {
        $properties = request()->only(array_keys($this->properties));
        $properties['self_assessment_area_group_id'] = $properties['area_group_id'];

        unset($properties['area_group_id']);

        return $properties;
    }
}
