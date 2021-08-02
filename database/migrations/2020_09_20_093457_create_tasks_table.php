<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('parent_id')->nullable()->default(NULL);
            $table->unsignedBigInteger('epic_id')->nullable()->default(NULL);
            $table->tinyInteger('type');
            $table->tinyInteger('state');
            $table->string('title', 500);
            $table->text('description')->nullable()->default(NULL);
            $table->dateTime('due_date')->nullable()->default(NULL);
            $table->timestamp('finished_at')->nullable()->default(NULL);
            $table->unsignedBigInteger('taskable_id')->nullable()->default(NULL);
            $table->string('taskable_type', 100)->nullable()->default(NULL);
            $table->timestamps();

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
        Schema::dropIfExists('tasks');
    }
}
