<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', 'Api\AuthController@login');
Route::post('/refresh', 'Api\AuthController@refresh');

Route::get('/401', 'Api\AuthController@unauthorized')->name('api.unauthorized');
Route::post('/self-assessment/streams/import', 'Api\SelfAssessment\StreamsController@import');

Route::middleware(['auth.proxy', 'auth:api'])->group(function () {
    Route::post('/logout', 'Api\AuthController@logout');

    Route::prefix('profile')->group(function() {
        Route::get('/', 'Api\ProfileController@index');
        Route::patch('/', 'Api\ProfileController@update');
        Route::patch('/password', 'Api\ProfileController@updatePassword');
        Route::put('/photo', 'Api\ProfileController@updatePhoto');
        Route::get('/stats', 'Api\ProfileController@stats');
        Route::get('/notifications', 'Api\ProfileController@notifications');
        Route::patch('/notifications/read-all', 'Api\ProfileController@markAllNotificationsAsRead');
    });

    Route::prefix('info')->group(function() {
        Route::get('/action-plan-status', 'Api\InfoController@actionPlanStatus');
    });

    Route::get('/users', 'Api\UsersController@index');
    Route::get('/users/rank', 'Api\UsersController@rank');

    Route::prefix('account')->namespace('Api\Account')->group(function () {
        Route::apiResource('/users', 'UsersController');
        Route::get('/roles', 'RolesController@index');
        Route::get('/permissions', 'PermissionsController@index');
    });

    Route::apiResource('/action-plan-categories', 'Api\ActionPlanCategoriesController')
        ->except(['show']);

    Route::get('/management-action-plans', 'Api\ManagementActionPlansController@index');
    Route::patch('/management-action-plans/{actionPlan}', 'Api\ManagementActionPlansController@update')
        ->middleware([
            'permission:manage management action plan|report management action plan',
        ]);
    Route::apiResource('/management-action-plans', 'Api\ManagementActionPlansController')
        ->only(['store', 'destroy'])
        ->middleware(['can:manage management action plan']);
    Route::get('/management-action-plans/{actionPlan}/histories', 'Api\ManagementActionPlansController@histories');

    Route::prefix('performance-monitoring')->namespace('Api\PerformanceMonitoring')->group(function () {
        Route::apiResource('/templates', 'TemplatesController');
        Route::apiResource('/templates/{templateId}/indicators', 'IndicatorsController')
            ->only(['index', 'store']);

        Route::get('/assessments/summaries', 'AssessmentsController@summaries');
        Route::get('/assessments', 'AssessmentsController@index');
        Route::post('/assessments', 'AssessmentsController@store');

        Route::get('/action-plans', 'ActionPlansController@index');
        Route::patch('/action-plans/{actionPlan}', 'ActionPlansController@update')
            ->middleware([
                'permission:manage performance monitoring action plan|report performance monitoring action plan',
            ]);
        Route::apiResource('/action-plans', 'ActionPlansController')
            ->only(['store', 'destroy'])
            ->middleware(['can:manage performance monitoring action plan']);
        Route::get('/action-plans/{actionPlan}/histories', 'ActionPlansController@histories');
    });

    Route::prefix('self-assessment')->namespace('Api\SelfAssessment')->group(function () {
        Route::apiResource('/streams', 'StreamsController');
        Route::apiResource('/area-groups', 'AreaGroupsController')
            ->except(['show']);
        Route::apiResource('/areas', 'AreasController')
            ->except(['show']);
        Route::apiResource('/sub-areas', 'SubAreasController');
        Route::apiResource('/criteria', 'CriteriaController')
            ->except(['show']);

        Route::get('/action-plans', 'ActionPlansController@index');
        Route::patch('/action-plans/{actionPlan}', 'ActionPlansController@update')
            ->middleware([
                'permission:manage self assessment action plan|report self assessment action plan',
            ]);
        Route::apiResource('/action-plans', 'ActionPlansController')
            ->only(['store', 'destroy'])
            ->middleware(['can:manage self assessment action plan']);
        Route::get('/action-plans/{actionPlan}/histories', 'ActionPlansController@histories');
        Route::post('/projects', 'ProjectsController@store');
        Route::get('/projects/summary', 'ProjectsController@summary');
        Route::get('/projects/stream-rank', 'ProjectsController@streamRank');
    });

    Route::get('/epics', 'Api\EpicController@index');
    Route::patch('/epics/{id}', 'Api\EpicController@update')
        ->middleware(['can:manage self assessment']);
    Route::apiResource('/tasks', 'Api\TasksController')
        ->only(['index', 'update', 'show']);
    Route::apiResource('/tasks', 'Api\TasksController')
        ->only(['store', 'destroy'])
        ->middleware(['can:manage self assessment']);
    Route::put('/tasks/{id}/attachments', 'Api\TasksController@updateAttachment');
    Route::delete('/tasks/{id}/attachments/{attachmentId}', 'Api\TasksController@removeAttachment');

    Route::apiResource('/rank-groups', 'Api\RankGroupsController')
       ->except(['show']);
});