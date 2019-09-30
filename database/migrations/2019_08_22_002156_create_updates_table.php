<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUpdatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('updates', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('status', 10);
            $table->tinyInteger('actual_level');
            $table->string('message')->nullable();
            $table->tinyInteger('rating')->nullable();
            $table->unsignedBigInteger('skill_id');
            $table->unsignedBigInteger('student_id');
            $table->string('date')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('updates');
    }
}
