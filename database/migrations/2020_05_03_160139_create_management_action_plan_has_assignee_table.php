<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateManagementActionPlanHasAssigneeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('management_action_plan_has_assignee', function (Blueprint $table) {
            $table->unsignedBigInteger('management_action_plan_id');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->foreign('management_action_plan_id', 'management_action_plant_id_foreign')->references('id')->on('management_action_plans');
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
        Schema::dropIfExists('management_action_plan_has_assignee');
    }
}
