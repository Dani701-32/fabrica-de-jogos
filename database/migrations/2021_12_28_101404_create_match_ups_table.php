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
        Schema::create('match_ups', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('layout');
            $table->integer('client_id');
            $table->integer('user_id');
            $table->string('origin');
            $table->string('slug')->unique();
            $table->string('pages', 2048);
            $table->dateTime('approved_at')->nullable()->useCurrentOnUpdate();
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
        Schema::dropIfExists('match_ups');
    }
};
