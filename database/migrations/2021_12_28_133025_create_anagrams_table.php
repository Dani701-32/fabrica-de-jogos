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
        Schema::create('anagrams', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('layout');
            $table->integer('client_id');
            $table->integer('user_id');
            $table->string('origin');
            $table->string('slug')->unique();
            $table->string('words', 5096);
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
        Schema::dropIfExists('anagrams');
    }
};
