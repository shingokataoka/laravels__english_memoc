<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BookOrWordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datetimeNowString = Carbon::now()->format('Y-m-d H:i:s');
        // book_id=1のレコードは最上階。
        $insertRows = [
            // トップページ
            [
                'user_id' => 1,
                'book_id' => 1,
                'sort_order_number' => 1,
                'type_is_book' => true,
                'english_word' => 'Top page',
                'japanese_word' => 'トップページ',
                'created_at' => '0000-01-01 00:00:00',
                'updated_at' => '0000-01-01 00:00:00',
            ],

            // 第一階層
            [
                'user_id' => 1,
                'book_id' => 1,
                'sort_order_number' => 1,
                'type_is_book' => true,
                'english_word' => 'every day',
                'japanese_word' => '毎日',
                'created_at' => $datetimeNowString,
                'updated_at' => $datetimeNowString,
            ],

            [
                'user_id' => 1,
                'book_id' => 1,
                'sort_order_number' => 3,
                'type_is_book' => true,
                'english_word' => 'afternoon',
                'japanese_word' => '昼',
                'created_at' => $datetimeNowString,
                'updated_at' => $datetimeNowString,
            ],
            [
                'user_id' => 1,
                'book_id' => 1,
                'sort_order_number' => 2,
                'type_is_book' => true,
                'english_word' => 'morning',
                'japanese_word' => '朝',
                'created_at' => $datetimeNowString,
                'updated_at' => $datetimeNowString,
            ],
            [
                'user_id' => 1,
                'book_id' => 1,
                'sort_order_number' => 4,
                'type_is_book' => true,
                'english_word' => 'evening',
                'japanese_word' => '夕方',
                'created_at' => $datetimeNowString,
                'updated_at' => $datetimeNowString,
            ],
            [
                'user_id' => 1,
                'book_id' => 1,
                'sort_order_number' => 5,
                'type_is_book' => true,
                'english_word' => 'night',
                'japanese_word' => '夜',
                'created_at' => $datetimeNowString,
                'updated_at' => $datetimeNowString,
            ],
            // 第二階層
            // 「朝」の子
            [
                'user_id' => 1,
                'book_id' => 4,
                'sort_order_number' => 2,
                'type_is_book' => true,
                'english_word' => 'I wash my face.',
                'japanese_word' => '2顔を洗うよ。',
                'created_at' => $datetimeNowString,
                'updated_at' => $datetimeNowString,
            ],
            [
                'user_id' => 1,
                'book_id' => 4,
                'sort_order_number' => 1,
                'type_is_book' => false,
                'english_word' => 'good morning.',
                'japanese_word' => '1おはよう。',
                'created_at' => $datetimeNowString,
                'updated_at' => $datetimeNowString,
            ],
            [
                'user_id' => 1,
                'book_id' => 4,
                'sort_order_number' => 3,
                'type_is_book' => false,
                'english_word' => 'I brush my teeth.',
                'japanese_word' => '3私は歯を磨くよ。',
                'created_at' => $datetimeNowString,
                'updated_at' => $datetimeNowString,
            ],
            // 「夕方」の子
            [
                'user_id' => 1,
                'book_id' => 5,
                'sort_order_number' => 1,
                'type_is_book' => true,
                'english_word' => 'Dinner time',
                'japanese_word' => '1ディナーのひととき',
                'created_at' => $datetimeNowString,
                'updated_at' => $datetimeNowString,
            ],
            // 第五階層
            // 「ディナーのひととき」の子
            [
                'user_id' => 1,
                'book_id' => 10,
                'sort_order_number' => 1,
                'type_is_book' => false,
                'english_word' => 'I eat dinner',
                'japanese_word' => '私は夕飯を食べるよ。',
                'created_at' => $datetimeNowString,
                'updated_at' => $datetimeNowString,
            ],
            // 第三階層



            [
                'user_id' => 2,
                'book_id' => 1,
                'sort_order_number' => 1,
                'type_is_book' => false,
                'english_word' => 'user2 I eat dinner',
                'japanese_word' => 'user2 私は夕飯を食べるよ。',
                'created_at' => $datetimeNowString,
                'updated_at' => $datetimeNowString,
            ],
            [
                'user_id' => 2,
                'book_id' => 1,
                'sort_order_number' => 1,
                'type_is_book' => true,
                'english_word' => 'user2 book',
                'japanese_word' => 'user2の本',
                'created_at' => $datetimeNowString,
                'updated_at' => $datetimeNowString,
            ],
            [
                'user_id' => 2,
                'book_id' => 13,
                'sort_order_number' => 1,
                'type_is_book' => false,
                'english_word' => 'user2 word of book',
                'japanese_word' => 'user2の本の言葉',
                'created_at' => $datetimeNowString,
                'updated_at' => $datetimeNowString,
            ],

        ];
        DB::table('book_or_words')->insert($insertRows);
    }
}
