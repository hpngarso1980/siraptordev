<?php

namespace App\Http\Controllers\Api\SelfAssessment;

use Arr;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use App\Repositories\SelfAssessmentActionPlanRepository;
use App\Repositories\UserRepository;
use App\Http\Resources\ActionPlanHistory as ActionPlanHistoryResource;
use App\Http\Resources\SelfAssessmentActionPlan as SelfAssessmentActionPlanResource;
use App\Http\Resources\SelfAssessmentActionPlanCollection;
use App\Notifications\SelfAssessmentActionPlanAssigned;

class ActionPlansController extends Controller
{
    protected $selfAssessmentActionPlan;
    protected $user;
    protected $properties;

    public function __construct(SelfAssessmentActionPlanRepository $selfAssessmentActionPlan, UserRepository $user)
    {
        $this->selfAssessmentActionPlan = $selfAssessmentActionPlan;
        $this->user = $user;
        $this->properties = [
            'description' => 'required|max:1000',
            'due_date' => 'required',
            'note' => 'max:1000',
            'status' => 'required|between:1,3',
            'epic_id' => 'nullable|exists:epics,id',
            'action_plan_category_id' => 'nullable|exists:action_plan_categories,id',
            'streams' => 'nullable|exists:self_assessment_streams,id',
            'areas' => 'nullable|exists:self_assessment_areas,id',
            'sub_areas' => 'nullable|exists:self_assessment_sub_areas,id',
            'assignees' => 'exists:users,id',
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->respondWithBareSuccess(
            new SelfAssessmentActionPlanCollection(
                $this->selfAssessmentActionPlan->paginate(config('constants.PAGINATION_DEFAULT_LIMIT'))
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
            $properties = $this->getActionPlanInput();

            $actionPlan = $this->selfAssessmentActionPlan->create($properties);

            $actionPlan = $this->syncRelations($actionPlan);

            return $this->respondWithCreated(
                new SelfAssessmentActionPlanResource($actionPlan)
            );
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
        $actionPlan = $this->selfAssessmentActionPlan->findById($id);

        if (!$actionPlan) return $this->respondWithNotFound();

        return $this->validateThenProceed(function () use ($id) {
            $properties = $this->getActionPlanInput();

            $actionPlan = $this->selfAssessmentActionPlan->update($id, $properties);

            $actionPlan = $this->syncRelations($actionPlan);

            return $this->respondWithSuccess(
                new SelfAssessmentActionPlanResource($actionPlan)
            );
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
        $actionPlan = $this->selfAssessmentActionPlan->findById($id);

        if (!$actionPlan) return $this->respondWithNotFound();

        try {
            if ($actionPlan->delete($id)) return $this->respondWithDeleted('Action plan berhasil dihapus');
            return $this->respondWithErrors(['Action plan gagal dihapus']);
        } catch (QueryException $e) {
            return $this->respondWithErrors(['Action plan gagal dihapus. Pastikan PIC, kategori, stream, area dan sub area sudah dihapus terlebih dahulu.']);
        }
    }

    public function histories($id)
    {
        $histories = $this->selfAssessmentActionPlan->histories($id);

        if (!$histories) return $this->respondWithNotFound();

        return $this->respondWithSuccess(
            ActionPlanHistoryResource::collection($histories)
        );
    }

    private function syncRelations($actionPlan)
    {
        $assignees = $this->getRelationInput('assignees');
        $streamIds = $this->getRelationInput('streams');
        $areaIds = $this->getRelationInput('areas');
        $subAreaIds = $this->getRelationInput('sub_areas');
        $notifyTargets = $this->user->findByIds($assignees);

        $actionPlan->assignees()->sync($assignees);
        $actionPlan->streams()->sync($streamIds);
        $actionPlan->areas()->sync($areaIds);
        $actionPlan->subAreas()->sync($subAreaIds);

        $notifyTargets->each(function($target) use ($actionPlan) {
            $target->notify(new SelfAssessmentActionPlanAssigned($actionPlan, request()->user()));
        });

        return $actionPlan;
    }

    private function getActionPlanInput()
    {
        return request()->only(
            array_keys(Arr::except($this->properties, [
                'assignees',
                'streams',
                'areas',
                'sub_areas',
            ]))
        );
    }

    private function getRelationInput($type = 'assignees')
    {
        return request()->input($type, []);
    }
}
