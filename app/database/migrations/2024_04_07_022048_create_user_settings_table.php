<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->string('default_voice_name');
            $table->boolean('is_english_first_position')->defalut(true);
            $table->boolean('is_show_all_answers');
            $table->double('default_speaking_speed', 4, 2)->default(1);
            $table->double('slow_speaking_speed', 4, 2)->default(0.75);
            $table->boolean('is_dark')->default(false);
            $table->datetime('created_at')->nullable();
            $table->datetime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_settings');
    }
};
