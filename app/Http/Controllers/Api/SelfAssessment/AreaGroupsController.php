<?php

namespace App\Http\Controllers\Api\SelfAssessment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\SelfAssessmentAreaGroupRepository;
use App\Http\Resources\SelfAssessmentAreaGroup as SelfAssessmentAreaGroupResource;

class AreaGroupsController extends Controller
{
    protected $selfAssessmentAreaGroup;
    protected $properties;

    public function __construct(SelfAssessmentAreaGroupRepository $selfAssessmentAreaGroup)
    {
        $this->selfAssessmentAreaGroup = $selfAssessmentAreaGroup;
        $this->properties = [
            'name' => 'required',
            'weight' => 'required',
            'stream_id' => 'required|exists:self_assessment_streams,id',
            'parent_id' => 'nullable',
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
        $result = $streamId
            ? SelfAssessmentAreaGroupResource::collection($this->selfAssessmentAreaGroup->findAllByStreamId($streamId))
            : [];

        return $this->respondWithSuccess($result);
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
            $properties = $this->getAreaGroupInput();

            $areaGroup = $this->selfAssessmentAreaGroup->create($properties);

            return $this->respondWithCreated($areaGroup);
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
        $areaGroup = $this->selfAssessmentAreaGroup->findById($id);

        if (!$areaGroup) return $this->respondWithNotFound();

        return $this->validateThenProceed(function () use ($id) {
            $properties = $this->getAreaGroupInput();

            $areaGroup = $this->selfAssessmentAreaGroup->update($id, $properties);

            return $this->respondWithSuccess($areaGroup);
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
        $areaGroup = $this->selfAssessmentAreaGroup->findById($id);
        $messagePrefix = 'Grup area "'.$areaGroup->name.'"';

        if (!$areaGroup) return $this->respondWithNotFound();

        try {
            if ($areaGroup->delete($id)) return $this->respondWithDeleted($messagePrefix.' berhasil dihapus');
            return $this->respondWithErrors([$messagePrefix.' gagal dihapus']);
        } catch (QueryException $e) {
            return $this->respondWithErrors([$messagePrefix.' gagal dihapus. Pastikan tidak ada yang menggunakan grup area ini.']);
        }
    }

    private function getAreaGroupInput()
    {
        $input = request()->only(array_keys($this->properties));
        $input['self_assessment_stream_id'] = $input['stream_id'];

        unset($input['stream_id']);

        return $input;
    }
}
