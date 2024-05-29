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
        Schema::create('email_resets', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->comment('メールアドレスを更新したユーザーのID');
            $table->string('new_email')->comment('ユーザーが新規に設定したメールアドレス');
            $table->string('token');
            $table->datetime('created_at')->nullable();
            $table->datetime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('email_resets');
    }
};
