<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InfoController extends Controller
{
    public function actionPlanStatus() {
        return $this->respondWithSuccess(config('enums.action_plan_status'));
    }
}
