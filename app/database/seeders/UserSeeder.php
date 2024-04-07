<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datetimeNowString = Carbon::now()->format('Y-m-d H:i:s');
        DB::table('users')->insert([
            [
                'name' => 'user1',
                'email' => 'user1@test.com',
                'password' => Hash::make('user1111'),
                'created_at' => $datetimeNowString,
                'updated_at' => $datetimeNowString,
            ],
        ]);
    }
}
