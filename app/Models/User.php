<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasRoles, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'phone', 'photo',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getPhotoAttribute($value)
    {
        return $value ? config('constants.PROFILE_PHOTO_URL').'/'.$value : NULL;
    }

    public function getPhotoFileNameAttribute()
    {
        $prefix = config('constants.PROFILE_PHOTO_URL').'/';

        return str_replace($prefix, '', $this->photo);
    }

    public function withAllPermissions()
    {
        $permissions = $this->getAllPermissions();

        $this->all_permissions = $permissions;

        return $this;
    }

    public function managementActionPlans()
    {
        return $this->belongsToMany('App\Models\ManagementActionPlan', 'management_action_plan_has_assignee');
    }

    public function performanceActionPlans()
    {
        return $this->belongsToMany('App\Models\PerformanceActionPlan', 'performance_action_plan_has_assignee');
    }

    public function selfAssessmentActionPlans()
    {
        return $this->belongsToMany('App\Models\SelfAssessmentActionPlan', 'self_assessment_action_plan_has_assignee');
    }

    public function tasks()
    {
        return $this->belongsToMany('App\Models\Task', 'task_assignees');
    }
}
