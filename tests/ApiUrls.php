<?php

namespace Tests;

trait ApiUrls
{
    protected $apiUrls = [
        'login' => '/api/login',
        'refresh' => '/api/refresh',
        'logout' => '/api/logout',
        'actionPlanStatusOptions' => '/api/info/action-plan-status',
        'assigneeOptions' => '/api/users',
    ];
}
