<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSelfAssessmentActionPlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('self_assessment_action_plans', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('action_plan_category_id')->nullable()->default(NULL);
            $table->unsignedBigInteger('epic_id')->nullable()->default(NULL);
            $table->string('description', 1000);
            $table->date('due_date');
            $table->string('note', 1000)->nullable()->default(NULL);
            $table->tinyInteger('status');
            $table->timestamp('finished_at')->nullable()->default(NULL);
            $table->timestamps();

            $table
                ->foreign('action_plan_category_id')
                ->references('id')
                ->on('action_plan_categories');
            $table
                ->foreign('epic_id')
                ->references('id')
                ->on('epics');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('self_assessment_action_plans');
    }
}
