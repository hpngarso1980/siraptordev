<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePerformanceActionPlanHasAssigneeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('performance_action_plan_has_assignee', function (Blueprint $table) {
            $table->unsignedBigInteger('performance_action_plan_id');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->foreign('performance_action_plan_id', 'performance_action_plant_id_foreign')->references('id')->on('performance_action_plans');
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
        Schema::dropIfExists('performance_action_plan_has_assignee');
    }
}
