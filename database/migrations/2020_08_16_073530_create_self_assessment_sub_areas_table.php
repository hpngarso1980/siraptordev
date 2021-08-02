<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSelfAssessmentSubAreasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('self_assessment_sub_areas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('self_assessment_area_id');
            $table->string('name', 255);
            $table->float('weight')->default(0);
            $table->float('score_target')->default(0);
            $table->timestamps();

            $table
                ->foreign('self_assessment_area_id')
                ->references('id')
                ->on('self_assessment_areas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('self_assessment_sub_areas');
    }
}
