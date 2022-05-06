<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\GameCategory;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('games', static function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('layout');
            $table->string('slug')->unique();
            $table->foreignIdFor(GameCategory::class)->constrained();
            $table->string('options', 5096);
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
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
