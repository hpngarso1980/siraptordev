<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePerformanceActionPlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('performance_action_plans', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('performance_template_id')->nullable()->default(NULL);
            $table->string('description', 1000);
            $table->date('due_date');
            $table->string('note', 1000)->nullable()->default(NULL);
            $table->tinyInteger('status');
            $table->timestamp('finished_at')->nullable()->default(NULL);
            $table->timestamps();

            $table->foreign('performance_template_id', 'performance_template_id_foreign')->references('id')->on('performance_templates');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('management_action_plans');
    }
}
