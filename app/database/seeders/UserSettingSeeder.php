<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class UserSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('user_settings')->insert([
            [
                'user_id' => 1,
                'default_voice_name' => 'Google Us English',
                'is_dark' => false,
            ],
        ]);
    }
}
