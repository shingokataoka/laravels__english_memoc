<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\Translation;
use App\Models\EnJaTranslation;



class ApiAiTranslationController extends Controller
{

    // AIのGeminiにセリフ内の英単語を返してもらい、DBに登録する。
    public function fetchInsertTranslations ()
    {
        // $enLine = "I I'm  muscular awdawfdsefdsr dark like black  　　 　  　  『』「』 　　 　　　　 　   washed     my mouth at　 　morning.!!?";
        // $enLine = "cooked grandma's";
        $enLine = request()->post('enLine');

        // AIのGeminiから和訳持ちの英単語をもらう。
        $result = Translation::fetchInsertTranslations($enLine);

        // レスポンスがエラーなら、エラーを返す。
        if (!empty($result[0]) && $result[0] === false) {
            response()->json(['message' => $result[1]], 500);
        }


        // -- 各英単語の辞書データを返す。 --
        // 英語セリフをスペースで分解する。
        $words = explode(' ', $enLine);
        // DBから取得する。
        $result = EnJaTranslation::whereIn('lower_en', $words)->get()->keyBy('lower_en')->toArray();
        // フロントエンドにDBからの辞書データを返す。
        return $result;
    }

}
