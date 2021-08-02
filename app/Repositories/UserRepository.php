<?php

namespace App\Repositories;

use DB;
use Carbon\Carbon;
use App\Repositories\BaseRepository;
use App\Models\User;

class UserRepository extends BaseRepository
{
    public function __construct(User $user)
    {
        $permissions = config('policies.permissions');

        $this->model = $user;
    }

    public function findAll()
    {
        $users = $this->findWithAttributes()->get()->map(function ($user) {
            return $user->withAllPermissions();
        });

        return $users;
    }

    public function findAllWithColumns($columns = [])
    {
        return $this->model->select($columns)->get();
    }

    public function paginate($limit)
    {
        $paginatedUsers = $this->findWithAttributes()->paginate($limit);
        $users = $paginatedUsers->getCollection()->map(function ($user) {
            return $user->withAllPermissions();
        });
        $paginatedUsers->setCollection($users);

        return $paginatedUsers;
    }

    public function findById($id)
    {
        $user = $this->findWithAttributes()->find($id);

        if (!$user) return $user;

        return $user->withAllPermissions();
    }

    public function findByIds($ids)
    {
        return $this->model->find($ids);
    }

    public function findByEmail($email)
    {
        return $this->model->where('email', $email)->first();
    }

    public function rank($startDate = NULL, $endDate = NULL)
    {
        $now = Carbon::now()->format('Y-m-d');
        $startDate = $startDate ?: $now;
        $endDate = $endDate ?: $now;

        return DB::select("
            select
                id, name, ROUND(AVG(score), 2) as completion_rate
            from users
            left join
                (select
                    task.id as task_id, task.due_date, task.status, task.finished_at, task.created_at,
                    users.id as user_id, users.name as user_name,
                    DATEDIFF(task.finished_at, task.created_at) as task_finished_days,
                    (2 - IFNULL(DATEDIFF(task.finished_at, task.created_at) / DATEDIFF(task.due_date, task.created_at), 0)) as score
                from users
                inner join self_assessment_action_plan_has_assignee assignee on assignee.user_id = users.id
                inner join self_assessment_action_plans task on task.id = assignee.self_assessment_action_plan_id
                where task.status = 3
                and task.created_at >= '$startDate'
                and task.created_at <= '$endDate'
                union
                select
                    task.id as task_id, task.due_date, task.status, task.finished_at, task.created_at,
                    users.id as user_id, users.name as user_name,
                    DATEDIFF(task.finished_at, task.created_at) as task_finished_days,
                    (2 - IFNULL(DATEDIFF(task.finished_at, task.created_at) / DATEDIFF(task.due_date, task.created_at), 0)) as score
                from users
                inner join performance_action_plan_has_assignee assignee on assignee.user_id = users.id
                inner join performance_action_plans task on task.id = assignee.performance_action_plan_id
                where task.status = 3
                and task.created_at >= '$startDate'
                and task.created_at <= '$endDate') t
            on t.user_id = users.id
            group by id, name
            order by completion_rate desc, name asc
        ");
    }

    private function findWithAttributes()
    {
        return $this->model->with(['roles']);
    }
}
