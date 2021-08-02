<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSelfAssessmentActionPlanHasAssignee extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('self_assessment_action_plan_has_assignee', function (Blueprint $table) {
            $table->unsignedBigInteger('self_assessment_action_plan_id');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->foreign('self_assessment_action_plan_id', 'self_assessment_action_plant_id_foreign')->references('id')->on('self_assessment_action_plans');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('self_assessment_action_plan_has_assignee');
    }
}
