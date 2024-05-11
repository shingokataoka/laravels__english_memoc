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
        $insertRows = [];
        for ($i=1; $i<=9; $i++) {
            $insertRows[] = [
                'user_id' => $i,
                'default_voice_name' => 'Google Us English',
                'is_dark' => ($i === 1)? true : mt_rand(0, 1),
            ];
        }

        DB::table('user_settings')->insert($insertRows);
    }
}
