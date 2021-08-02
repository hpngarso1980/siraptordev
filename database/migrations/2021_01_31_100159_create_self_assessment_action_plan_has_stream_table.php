<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSelfAssessmentActionPlanHasStreamTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('self_assessment_action_plan_has_stream', function (Blueprint $table) {
            $table->unsignedBigInteger('self_assessment_action_plan_id');
            $table->unsignedBigInteger('self_assessment_stream_id');
            $table->timestamps();

            $table->foreign('self_assessment_action_plan_id', 'sa_stream_action_plan_id_foreign')->references('id')->on('self_assessment_action_plans');
            $table->foreign('self_assessment_stream_id', 'sa_stream_stream_id_foreign')->references('id')->on('self_assessment_streams');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('self_assessment_action_plan_has_stream');
    }
}
