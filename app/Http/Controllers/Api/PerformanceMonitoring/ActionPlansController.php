<?php

namespace App\Http\Controllers\Api\PerformanceMonitoring;

use Arr;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use App\Repositories\PerformanceActionPlanRepository;
use App\Repositories\UserRepository;
use App\Http\Resources\ActionPlanHistory as ActionPlanHistoryResource;
use App\Http\Resources\PerformanceActionPlan as PerformanceActionPlanResource;
use App\Http\Resources\PerformanceActionPlanCollection;
use App\Notifications\PerformanceActionPlanAssigned;

class ActionPlansController extends Controller
{
    protected $performanceActionPlan;
    protected $user;
    protected $properties;

    public function __construct(PerformanceActionPlanRepository $performanceActionPlan, UserRepository $user)
    {
        $this->performanceActionPlan = $performanceActionPlan;
        $this->user = $user;
        $this->properties = [
            'description' => 'required|max:1000',
            'due_date' => 'required',
            'note' => 'max:1000',
            'status' => 'required|between:1,3',
            'performance_template_id' => 'nullable|exists:performance_templates,id',
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
            new PerformanceActionPlanCollection(
                $this->performanceActionPlan->paginate(config('constants.PAGINATION_DEFAULT_LIMIT'))
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

            $actionPlan = $this->performanceActionPlan->create($properties);

            $actionPlan = $this->syncRelations($actionPlan);

            return $this->respondWithCreated(
                new PerformanceActionPlanResource($actionPlan)
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
        $actionPlan = $this->performanceActionPlan->findById($id);

        if (!$actionPlan) return $this->respondWithNotFound();

        return $this->validateThenProceed(function () use ($id) {
            $properties = $this->getActionPlanInput();

            $actionPlan = $this->performanceActionPlan->update($id, $properties);

            $actionPlan = $this->syncRelations($actionPlan);

            return $this->respondWithSuccess(
                new PerformanceActionPlanResource($actionPlan)
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
        $actionPlan = $this->performanceActionPlan->findById($id);

        if (!$actionPlan) return $this->respondWithNotFound();

        try {
            if ($actionPlan->delete($id)) return $this->respondWithDeleted('Action plan berhasil dihapus');
            return $this->respondWithErrors(['Action plan gagal dihapus']);
        } catch (QueryException $e) {
            return $this->respondWithErrors(['Action plan gagal dihapus. Pastikan PIC sudah dihapus terlebih dahulu.']);
        }
    }

    public function histories($id)
    {
        $histories = $this->performanceActionPlan->histories($id);

        if (!$histories) return $this->respondWithNotFound();

        return $this->respondWithSuccess(
            ActionPlanHistoryResource::collection($histories)
        );
    }

    private function syncRelations($actionPlan)
    {
        $assignees = $this->getAssigneesInput();
        $notifyTargets = $this->user->findByIds($assignees);

        $actionPlan->assignees()->sync($assignees);

        $notifyTargets->each(function($target) use ($actionPlan) {
            $target->notify(new PerformanceActionPlanAssigned($actionPlan, request()->user()));
        });

        return $actionPlan;
    }

    private function getActionPlanInput()
    {
        return request()->only(
            array_keys(Arr::except($this->properties, ['assignees']))
        );
    }

    private function getAssigneesInput()
    {
        return request()->input('assignees', []);
    }
}
