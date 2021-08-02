<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSelfAssessmentAreaGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('self_assessment_area_groups', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('parent_id')->nullable()->default(NULL);
            $table->unsignedBigInteger('self_assessment_stream_id');
            $table->string('name', 255);
            $table->float('weight');
            $table->timestamps();

            $table
                ->foreign('self_assessment_stream_id')
                ->references('id')
                ->on('self_assessment_streams');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('self_assessment_area_groups');
    }
}
