<?php

namespace App\Repositories;

use Arr;

use App\Repositories\BaseRepository;
use App\Repositories\Concerns\ActionPlanTimestamps;
use App\Models\ActionPlanCategory;
use App\Models\SelfAssessmentActionPlan;
use App\Models\SelfAssessmentStream;
use App\Models\SelfAssessmentArea;
use App\Models\SelfAssessmentSubArea;

class SelfAssessmentActionPlanRepository extends BaseRepository
{
    use ActionPlanTimestamps;

    public function __construct(SelfAssessmentActionPlan $selfAssessmentActionPlan)
    {
        $this->model = $selfAssessmentActionPlan;
        $this->fullControlPermissions = [
            config('policies.permissions.MANAGE_SELF_ASSESSMENT_ACTION_PLAN'),
            config('policies.permissions.VIEW_ALL_SELF_ASSESSMENT_ACTION_PLAN'),
        ];
        $this->statusLabels = array_reduce(config('enums.action_plan_status'), function ($result, $item) {
            $result[$item['value']] = $item['label'];

            return $result;
        }, []);
    }

    public function findAll()
    {
        $relations = [
            'epic',
            'streams',
            'areas',
            'subAreas',
            'assignees',
        ];

        return $this->model->with($relations)->get();
    }

    public function paginate($limit)
    {
        $currentUser = request()->user();

        if ($this->hasFullControl()) {
            return $this->model->paginate($limit);
        } else {
            return $currentUser->selfAssessmentActionPlans()->paginate($limit);
        }
    }

    public function create($properties)
    {
        $result = $this->model->create($this->finalizeTimestamps($properties));

        $result->histories()->create([
            'user_id' => request()->user()->id,
            'change_type' => config('enums.history_change_types.create'),
        ]);

        return $result;
    }

    public function update($id, $properties)
    {
        $oldData = $this->model->find($id);
        $categories = ActionPlanCategory::all();
        $result = parent::update($id, $this->finalizeTimestamps($properties, $oldData));

        $histories = [];

        foreach ($properties as $key => $value) {
            if ($key === 'status') {
                $from = array_key_exists($oldData[$key], $this->statusLabels)
                    ? $this->statusLabels[$oldData[$key]]
                    : NULL;
                $to = array_key_exists($value, $this->statusLabels)
                    ? $this->statusLabels[$value]
                    : NULL;
            } else if ($key === 'action_plan_category_id') {
                $fromCategory = $oldData[$key]
                ?   $categories->first(function($category) use ($oldData, $key) {
                        return $category->id === $oldData[$key];
                    })
                :   NULL;
                $from = $fromCategory ? $fromCategory->name : NULL;
                $toCategory = $value
                    ?   $categories->first(function($category) use ($value) {
                            return $category->id === $value;
                        })
                    :   NULL;
                $to = $toCategory ? $toCategory->name : NULL;
            } else {
                $from = $oldData[$key];
                $to = $value;
            }

            if ($to !== $from) {
                array_push($histories, [
                    'user_id' => request()->user()->id,
                    'change_type' => config('enums.history_change_types.update'),
                    'field_name' => $key,
                    'from' => $from,
                    'to' => $to,
                ]);
            }
        }

        $result->histories()->createMany($histories);

        return $result;
    }

    public function histories($id)
    {
        if ($this->hasFullControl()) {
            $actionPlan = $this->model->find($id);
        } else {
            $currentUser = request()->user();
            $actionPlan = $currentUser->selfAssessmentActionPlans()->find($id);
        }

        if (!$actionPlan) {
            return NULL;
        }

        return $actionPlan->histories;
    }
}
