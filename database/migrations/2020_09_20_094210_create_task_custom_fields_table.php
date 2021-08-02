<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaskCustomFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task_custom_fields', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('task_id');
            $table->unsignedBigInteger('custom_field_id');
            $table->string('value', 5000)->nullable()->default(NULL);
            $table->timestamps();

            $table
                ->foreign('task_id')
                ->references('id')
                ->on('tasks');

            $table
                ->foreign('custom_field_id')
                ->references('id')
                ->on('custom_fields');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('task_custom_fields');
    }
}
