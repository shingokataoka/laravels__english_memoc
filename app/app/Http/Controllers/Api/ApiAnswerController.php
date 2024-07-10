<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Gemini\Laravel\Facades\Gemini;



class ApiAnswerController extends Controller
{


    // 下記二つの共通の処理のメソッド。
    // japanese_answer(日本語か正解か)とenglish_answer(英語が正解か)の共通処理のメソッド。
    // 戻り値は全て文字列で、正解="true"、不正解="false"、エラー="error"。
    public static function answer($geminiText)
    {
        try {
            // Geminiから返答をもらう。メソッドはgeminiProを使っているが、geminiProは無料版だから大丈夫。ただし、google
            $result = Gemini::geminiPro()->generateContent($geminiText);
            // 返答は文字列の"true"か"false"を返してもらっているはず。
            $resText = $result->candidates[0]->content->parts[0]->text;
        } catch (\Exception $e) {
            // エラーなら、「英会話めもっくは限界なようです。しばらく休ませてあげましょう。」を表示させるために"error"を返す。
            return "error";
        }

        // 文字列"true"か"false"を返す。
        return $resText;
    }





    // 英文に対しての和訳が正しいかを返す。 文字列でtrue false errorを返す。
    public function japanese_answer(Request $request)
    {
        $englishText = $request->post('englishText');
        $japaneseText = $request->post('japaneseText');

        // Geminiへの質問文を作成。
        $geminiText = "英語「{$englishText}」の日本語訳は「{$japaneseText}」でも正解ですか。trueかfalseのみで答えてください。";
        return self::answer($geminiText);
    }





    // 日本語文に対しての英訳が正しいかを返す。 文字列でtrue false errorを返す。
    public function english_answer(Request $request)
    {
        $englishText = $request->post('englishText');
        $japaneseText = $request->post('japaneseText');

        // Geminiへの質問文を作成。
        $geminiText = "日本語「{$japaneseText}」の英訳は「{$englishText}」でも正解ですか。trueかfalseのみで答えてください。";
        return self::answer($geminiText);
    }

}
