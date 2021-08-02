<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSelfAssessmentActionPlanHasSubAreaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('self_assessment_action_plan_has_sub_area', function (Blueprint $table) {
            $table->unsignedBigInteger('self_assessment_action_plan_id');
            $table->unsignedBigInteger('self_assessment_sub_area_id');
            $table->timestamps();

            $table->foreign('self_assessment_action_plan_id', 'sa_sub_area_action_plan_id_foreign')->references('id')->on('self_assessment_action_plans');
            $table->foreign('self_assessment_sub_area_id', 'sa_sub_area_sub_area_id_foreign')->references('id')->on('self_assessment_sub_areas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('self_assessment_action_plan_has_sub_area');
    }
}
