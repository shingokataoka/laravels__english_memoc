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

        $insertRow = [];
        for ($i=1; $i<=9; $i++) {
            $insertRow[] = [
                'name' => "user{$i}",
                'email' => "user{$i}@test.com",
                'email_verified_at' => $datetimeNowString,
                'password' => Hash::make("user{$i}{$i}{$i}{$i}"),
                'created_at' => $datetimeNowString,
            ];
        }
        DB::table('users')->insert($insertRow);
    }
}
