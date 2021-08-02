<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePerformanceAssessmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('performance_assessments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('performance_indicator_id');
            $table->tinyInteger('month');
            $table->decimal('target', 8, 2)->nullable()->default(0);
            $table->decimal('realization', 8, 2)->nullable()->default(0);
            $table->decimal('accomplishment_percentage', 5, 2)->nullable()->default(0);
            $table->decimal('score', 6, 2)->nullable()->default(0);
            $table->string('note', 500)->nullable()->default(NULL);
            $table->timestamps();

            $table
                ->foreign('performance_indicator_id')
                ->references('id')
                ->on('performance_indicators');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('performance_assessments');
    }
}
