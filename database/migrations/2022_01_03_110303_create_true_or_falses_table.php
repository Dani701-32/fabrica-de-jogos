<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('true_or_falses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('layout');
            $table->integer('client_id');
            $table->integer('user_id');
            $table->string('origin');
            $table->string('slug')->unique();
            $table->string('questions', 5096);
            $table->dateTime('approved_at')->nullable();
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
        Schema::dropIfExists('true_or_falses');
    }
};
