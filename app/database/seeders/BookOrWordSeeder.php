<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\BookOrWord;
use App\Services\SampleWord;



class BookOrWordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::transaction(function () {

        // 「トップページ」を追加する。
        // book_id=1のレコードは最上階。
            $params = [
                'user_id' => 1,
                'book_id' => 1,
                'sort_order_number' => 1,
                'type_is_book' => true,
                'english_word' => 'Top page',
                'japanese_word' => 'トップページ',
            ];
            BookOrWord::create($params);


            // まずDBのuserを全て取得。
            $users = User::all()->sortBy('id');

            // 各ユーザーごとにサンプルのBookOrWordレコードを追加する。
            foreach ($users as $user) {
                SampleWord::create($user->id);
            }
        });

    }
}
