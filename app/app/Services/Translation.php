<?php
namespace App\Services;

use Gemini\Laravel\Facades\Gemini;

use App\Models\EnJaTranslation;


class Translation
{

    // 英文を渡すと、DBにない単語をGeminiからもらうメソッド。
    // 下記のメソッドで使う。
    private static function fetchTranslations (/* array */ $enWords)
    {
        // 各単語を繋いで"「単語その１」「単語その２」...「最後の単語」"にする。
        $enLine = '『' . implode('』『', $enWords) . '』';

        // AIのGeminiへの質問プロンプト。
        $prompt = <<<EOT
        英単語『halloween』『usa』{$enLine}の全てを正しい英語か評価してを以下のJSON形式のみで返してください。
        {
            単語その１: {
                en: 大文字小文字を修正した単語その１、でも間違った英語ならfalseのみ,
                ja: 単語その１の全ての和訳の配列、でも間違った英語ならfalseのみ,
            },
            単語その２: {
                en: 大文字小文字を修正した単語その２、でも間違った英語ならfalseのみ,
                ja: 単語その２の全ての和訳の配列、でも間違った英語ならfalseのみ,
            },
            ...
            最後の単語: {
                en: 大文字小文字を修正した最後の単語、でも間違った英語ならfalseのみ,
                ja: 最後の単語の全ての和訳の配列、でも間違った英語ならfalseのみ,
            },
        };
        EOT;

        // Geminiから返答をもらう。
        // GeminiProは無料版だから大丈夫。GoogleのAIです。
        try {
            $result = Gemini::geminiPro()->generateContent($prompt);
            $resultText = $result->text();
            // レスポンスのテキストの{手前の文字を全て消す。
            $position1 = mb_strpos($resultText, '{');
            if ($position1 !== false) {
                $resultText = mb_substr($resultText, $position1);
            }
            // レスポンスのテキストの}より後ろの文字を全て消す。
            $position2 = mb_strrpos($resultText, '}');
            if ($position2 !== false) {
                $resultText = mb_substr($resultText, 0, $position2 + 1);
            }
            $reply = json_decode($resultText, true);
            return $reply;
        // エラーならfalseを返す。
        } catch (\Throwable $e) {
            return [false, $e->getMessage()];
        }
    }





    // 上記のGeminiからのレスポンスが指定配列以外ならfalseを返す。期待通りならtrueを返す。
    private static function isResponseCorrect($resultsArr)
    {
        // Geminiのレスポンスが期待通り以外なら、[false, エラー内容]を返す。
        if (
            !is_array($resultsArr)  // 配列じゃないなら。
            || count($resultsArr) === 0 // 配列の中身がないなら。
            || is_numeric( array_keys($resultsArr)[0] ) // 配列の添字がインデックス番号なら。
        ) {
            return false;
        }

        return true;
    }



    // 英文を渡すと、DBにない単語をGeminiからもらってDBに登録する。
    // 戻り値は、単語取得時は['en'=>英単語, 'ja'=>和訳]な配列。
    // 失敗時は[false, エラーメッセージ]な配列。
    public static function fetchInsertTranslations(/* string */ $enLine)
    {
        // 英文がなければnullを返す。
        if (empty($enLine) || !is_string($enLine)) return null;

        // 全ての全角記号を消す。
        $enLine = preg_replace('/[！-～『』「」]/u', '', $enLine);
        // 全ての全角スペースを半角スペースに置換する。
        $enLine = mb_convert_kana($enLine, 's');
        // 半角スペース連続二文字以上を半角スペース一文字に置換する。
        $enLine = preg_replace('/ {2,}/', ' ', $enLine);
        // 末尾の!、?、.、,、は消す。
        $enLine = rtrim($enLine, '!?,.');

        // 半角で区切った単語の配列にする。
        $tmpWords = explode(' ', $enLine);

        // DBテーブルにない単語だけにする。
        $enWords = [];
        foreach($tmpWords as $word) {
            $isExists = EnJaTranslation::where('en', $word)->exists();
            // ないなら配列に入れる。
            if (!$isExists) $enWords[] = $word;
        }

        // DBテーブルにない単語がないならnullを返す。
        if ($enWords === []) return null;


        // Geminiから各英単語の全ての和訳をもらう。
        $resultsArr = self::fetchTranslations($enWords);


        // Geminiからのレスポンスが期待通りでない場合の処理。
        // 「綴りチェックでエラーが発生した」などをフロントエンド側で表示するなどする。
        if ( self::isResponseCorrect($resultsArr) === false ) {

            // Geminiとのやりとりで、例外処理だった場合は[false, エラー内容]を返す。
            if (!empty($resultsArr[0]) && $resultsArr[0] === false) {
                return $resultsArr;
            }

            // Geminiのレスポンスが期待通り以外なら、[false, エラー内容]を返す。
            return [false, 'Geminiの「レスポンスがなぜか指定配列じゃない'];
        }




        // DBに追加する用の配列を作る。
        $translations = [];
        foreach ($resultsArr as $key => $row) {
            // 和訳がないなら追加せず、次のループへ。
            if (empty($row['ja'])) continue;
            // 各英単語の和訳が配列なら、「、」で繋いだ文字列にする。
            if (is_array($row['ja'])) {
                $row['ja'] = implode('、', $row['ja']);
            }
            $translations[$key] = $row;
        }


        // DBのen_ja_translationsテーブルに、まだない英単語を追加する。
        foreach ($translations as $row) {
            // en=文字列でないなら[false, エラー内容]を返す。
            if ( empty($row['en']) || !is_string($row['en']) ) return [false, '「en=>文字列」がない。'];

            // ja=文字列でないなら[false, エラー内容]を返す。
            if ( empty($row['ja']) || !is_string($row['ja']) ) {
                return [false, '「ja=>文字列」がない。'];
            }

            $isExists = EnJaTranslation::where('en', $row['en'])->exists();
            // まだDBテーブルに存在しないなら追加する。
            if ($isExists === false) {
                EnJaTranslation::create([
                    'en' => $row['en'],
                    'lower_en' => strtolower($row['en']),
                    'ja' => $row['ja'],
                ]);
            }
        }

        // 追加した「単語=>和訳」な配列を返す。
        return $translations;
    }
}
