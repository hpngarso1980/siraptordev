<?php

namespace App\Services;

use DB;
use App\Models\User;

class ProfileService
{
    public function getStats()
    {
        $user = request()->user();
        $managementActionPlanUnfinishedCount = $user->managementActionPlans()
            ->where('status', '<>', 3)->count();
        $performanceActionPlanUnfinishedCount = $user->performanceActionPlans()
            ->where('status', '<>', 3)->count();
        $selfAssessmentActionPlanUnfinishedCount = $user->selfAssessmentActionPlans()
            ->where('status', '<>', 3)->count();
        $selfAssessmentTasks = DB::table('tasks')
            ->join('task_assignees', 'tasks.id', '=', 'task_assignees.task_id')
            ->join('epics', 'tasks.epic_id', '=', 'epics.id')
            ->selectRaw('count(tasks.id) as task_count, epics.id as epic_id, epics.title as epic_title, tasks.state')
            ->where('task_assignees.user_id', '=', $user->id)
            ->groupBy(['epics.id', 'epics.title', 'state'])
            ->get()
            ->toArray();
        $selfAssessmentUnfinishedTaskCount = array_reduce($selfAssessmentTasks, function($carry, $item) {
            return $carry + ($item->state !== config('enums.task_states.done') ? $item->task_count : 0);
        }, 0);
        $unfinishedCount = $managementActionPlanUnfinishedCount +
            $performanceActionPlanUnfinishedCount +
            $selfAssessmentActionPlanUnfinishedCount +
            $selfAssessmentUnfinishedTaskCount;

        return [
            'notification_count' => $user->unreadNotifications()->count(),
            'management_action_plan_total_count' => $user->managementActionPlans()->count(),
            'performance_action_plan_total_count' => $user->performanceActionPlans()->count(),
            'self_assessment_action_plan_total_count' => $user->selfAssessmentActionPlans()->count(),
            'unfinished_task_count' => $unfinishedCount,
            'management_action_plan_unfinished_count' => $managementActionPlanUnfinishedCount,
            'performance_action_plan_unfinished_count' => $performanceActionPlanUnfinishedCount,
            'self_assessment_action_plan_unfinished_count' => $selfAssessmentActionPlanUnfinishedCount,
            'self_assessment_tasks' => $selfAssessmentTasks,
        ];
    }
}
