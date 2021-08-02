<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPriorityAndTypeToPerformanceAssessmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('performance_assessments', function (Blueprint $table) {
            $table->tinyInteger('type')->after('note')->nullable()->default(NULL);
            $table->tinyInteger('priority')->after('type')->nullable()->default(NULL);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('performance_assessments', function (Blueprint $table) {
            $table->dropColumn('type');
            $table->dropColumn('priority');
        });
    }
}
