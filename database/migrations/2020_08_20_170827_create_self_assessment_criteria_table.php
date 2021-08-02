<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSelfAssessmentCriteriaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('self_assessment_criteria', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('self_assessment_sub_area_id');
            $table->string('score', 45);
            $table->string('level', 500)->nullable()->default(NULL);
            $table->text('description')->nullable()->default(NULL);
            $table->timestamps();

            $table
                ->foreign('self_assessment_sub_area_id')
                ->references('id')
                ->on('self_assessment_sub_areas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('self_assessment_criteria');
    }
}
