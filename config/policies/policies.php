<?php

$roles = require('roles.php');
$permissions = require('permissions.php');

return [
    $roles['ADMIN'] => [
        $permissions['MANAGE_PERFORMANCE_MONITORING'],
        $permissions['MANAGE_PERFORMANCE_MONITORING_ACTION_PLAN'],
        $permissions['MANAGE_SELF_ASSESSMENT'],
        $permissions['MANAGE_SELF_ASSESSMENT_ACTION_PLAN'],
        $permissions['MANAGE_MANAGEMENT_ACTION_PLAN'],
        $permissions['MANAGE_USER'],
        $permissions['VIEW_SCORE_BOARD'],
    ],

    $roles['ASSESSOR_STAFF'] => [
        $permissions['REPORT_PERFORMANCE_MONITORING'],
        $permissions['REPORT_PERFORMANCE_MONITORING_ACTION_PLAN'],
        $permissions['REPORT_SELF_ASSESSMENT_RESULT'],
        $permissions['REPORT_SELF_ASSESSMENT_ACTION_PLAN'],
        $permissions['REPORT_MANAGEMENT_ACTION_PLAN'],
        $permissions['VIEW_SCORE_BOARD'],
    ],

    $roles['SUPERVISOR'] => [
        $permissions['REPORT_PERFORMANCE_MONITORING'],
        $permissions['REPORT_PERFORMANCE_MONITORING_ACTION_PLAN'],
        $permissions['REPORT_SELF_ASSESSMENT'],
        $permissions['REPORT_SELF_ASSESSMENT_ACTION_PLAN'],
        $permissions['REPORT_MANAGEMENT_ACTION_PLAN'],
        $permissions['VIEW_SCORE_BOARD'],
    ],

    $roles['STAFF'] => [
        $permissions['VIEW_PERFORMANCE_MONITORING'],
        $permissions['REPORT_PERFORMANCE_MONITORING_ACTION_PLAN'],
        $permissions['REPORT_SELF_ASSESSMENT'],
        $permissions['REPORT_SELF_ASSESSMENT_ACTION_PLAN'],
        $permissions['REPORT_MANAGEMENT_ACTION_PLAN'],
        $permissions['VIEW_SCORE_BOARD'],
    ],

    $roles['MANAGEMENT'] => [
        $permissions['VIEW_PERFORMANCE_MONITORING'],
        $permissions['VIEW_ALL_PERFORMANCE_MONITORING_ACTION_PLAN'],
        $permissions['VIEW_SELF_ASSESSMENT'],
        $permissions['VIEW_ALL_SELF_ASSESSMENT_ACTION_PLAN'],
        $permissions['VIEW_ALL_MANAGEMENT_ACTION_PLAN'],
        $permissions['VIEW_SCORE_BOARD'],
    ],
];
