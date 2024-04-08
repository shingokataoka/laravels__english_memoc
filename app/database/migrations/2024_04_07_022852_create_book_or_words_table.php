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
        Schema::create('book_or_words', function (Blueprint $table) {
            $table->id();
            $table->foreignId('book_id')->constrained('book_or_words')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->integer('sort_order_number');
            $table->boolean('type_is_book');
            $table->string('voice_name');
            $table->text('english_word');
            $table->text('japanese_word');
            $table->datetime('created_at')->nullable();
            $table->datetime('updated_at')->nullable();
            $table->datetime('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_or_words');
    }
};
