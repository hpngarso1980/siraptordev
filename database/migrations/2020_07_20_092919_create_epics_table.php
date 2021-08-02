<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEpicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('epics', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title', 255);
            $table->tinyInteger('state');
            $table->dateTime('start_date')->nullable()->default(NULL);
            $table->dateTime('end_date')->nullable()->default(NULL);
            $table->timestamp('finished_at')->nullable()->default(NULL);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('epics');
    }
}
