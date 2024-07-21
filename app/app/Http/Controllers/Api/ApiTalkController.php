<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


use Gemini\Laravel\Facades\Gemini;



class ApiTalkController extends Controller
{

    // AIからの返答を正常に取得できない時用の返答内容。
    private $errorReply = [
        'jaLine' => '',
        'isCorrect' => false,
        'correctLine' => '',
        'result' => 'ごめん。頭が回らない...。もう一度言って。',
        'jaResult' => '',
    ];





    // geminiにユーザーの英文への返答に必要な連想配列を返してもらう関数。
    // 一度目の取得で、修正した英文と元の英文が同じなのに間違い判定だったら、もう一度取得するために関数にした。
    public function fetchReply($userLine, $line0, $line1)
    {
        // Geminiへの質問用の文を作成。
        $prompt = <<<EOT
        以下の会話のユーザー英文を評価し、指定されたフォーマットで返答してね:
        ユーザーのセリフで一番古い:「{$line0}」
        あなたのセリフで次に古い:「{$line1}」
        ユーザー英文:「{$userLine}」

        英会話の練習なので、あなたがJamesという名前の優しいアメリカ人という設定で返答してね。
        英語の練習なので、一つの文で返してね。
        ユーザー英文に突然代名詞が含まれていても適当に合わせてください。
        以下のJSON形式で返答してね。
        ユーザー英文が正しい場合:
        {
            "jaLine": ユーザー英文を日本語訳にした文字列をここに書いてね。,
            "isCorrect": true,
            "correctLine": "",
            "result": ユーザー英文への返答を、英語で文字列でここに書いてね。,
            "jaResult": 'result'の文の全体を日本語訳にしてね。
        }
        ユーザー英文が正しくない場合:
        {
            "jaLine": "ユーザー英文を日本語訳にしてね。",
            "isCorrect": false,
            "correctLine": "ユーザー英文を正しく修正してね。",
            "result": "ユーザー英文が正しくない理由を親切でとても優しいタメ口で解説して。絶対に敬語を使わないで。",
            "jaResult": ""
        }
        EOT;

        // Geminiから返答をもらう。メソッドはgeminiProを使っているが、geminiProは無料版だから大丈夫。ただし、google
        try {
            $result = Gemini::geminiPro()->generateContent($prompt);
            // JSONをデコードして受け取る。
            $reply = json_decode($result->text(), true);

        // Geminiのエラーがでたら、失敗時の返答用を返す。
        } catch (\Error $e) {
            return $this->errorReply;
        }


        // JSONをデコードするのが失敗した場合、失敗時の返答用を返す。
        if (json_last_error() !== JSON_ERROR_NONE) {
            return $this->errorReply;
        }

        // JSONをデコードするのに成功した場合。

        // 必要なカラムがあるかチェックしていく。

        // 送った英文の日本語訳のカラムがないか、文字列でないなら、失敗時の返答用を返す。
        if ( !isset($reply['jaLine']) || !is_string($reply['jaLine']) ) return $this->errorReply;
        // 英文が正しいかのカラムがないか、booleanでないなら、失敗時の返答用を返す。
        if ( !isset($reply['isCorrect']) || !is_bool($reply['isCorrect']) ) return $this->errorReply;
        // 英文への英語で返答のカラムがないか、文字列でないなら、失敗時の返答用を返す。
        if ( !isset($reply['result']) || !is_string($reply['result']) ) return $this->errorReply;
        // 返答の日本語訳のカラムがないか、文字列でないなら、失敗時の返答用を返す。
        if ( !isset($reply['jaResult']) || !is_string($reply['jaResult']) ) return $this->errorReply;

        // Geminiからの返答を返す。
        return $reply;
    }





    // 英文への返答に必要な連想配列をGeminiから取得して返すAPI。
    public function reply()
    {
        // セリフ0を取得（userセリフのはず）。
        $line0 = request()->post('line0');
        // セリフ1を取得(アプリセリフのはず)。
        $line1 = request()->post('line1');
        // ユーザーのセリフを取得。
        $userLine = request()->post('userLine');

        // Geminiから返答に必要な連想配列を取得。
        $reply = $this->fetchReply($userLine, $line0, $line1);


        // 正しい英文判定なのに
        if (
            $reply['isCorrect'] === true
            && (
                // jaLineが日本語じゃないか（日本語文字を含まないならで判定）、
                ( !preg_match('/[\p{Han}\p{Hiragana}\p{Katakana}]+/u', $reply['jaLine']) )
                // resultが英語じゃないか（アルファベットを含まないならで判定）、
                || ( !preg_match('/[a-zA-Z]+/', $reply['result']) )
                // jaResultが日本語じゃないか（日本語文字を含まないならで判定）、
                || ( !preg_match('/[\p{Han}\p{Hiragana}\p{Katakana}]+/u', $reply['jaResult']) )
            )
        ) {
            // Geminiから返答に必要な連想配列を取得。
            $reply = $this->fetchReply($userLine);
        }



        // 返答結果が、英文が間違い判定なのに「修正した英文」と「元の英文」が同じなら、
        // もう一度Geminiから取得する。
        if (
            $reply['isCorrect'] === false
            && $reply['correctLine'] === $userLine
        ) {
            // Geminiから返答に必要な連想配列を取得。
            $reply = $this->fetchReply($userLine);
        }

        return $reply;
    }

}
