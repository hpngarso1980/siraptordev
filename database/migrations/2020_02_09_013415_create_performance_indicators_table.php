<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePerformanceIndicatorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('performance_indicators', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('performance_template_id');
            $table->unsignedBigInteger('performance_indicator_group_id');
            $table->unsignedBigInteger('parent_id')->nullable()->default(NULL);
            $table->string('code', 45);
            $table->string('indicator', 500);
            $table->string('unit', 45)->nullable()->default(NULL);
            $table->decimal('weight', 5, 2)->nullable()->default(0);
            $table->tinyInteger('priority')->nullable()->default(NULL);
            $table->timestamps();

            $table
                ->foreign('performance_template_id')
                ->references('id')
                ->on('performance_templates');
            $table
                ->foreign('performance_indicator_group_id')
                ->references('id')
                ->on('performance_indicator_groups');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('performance_indicators');
    }
}
