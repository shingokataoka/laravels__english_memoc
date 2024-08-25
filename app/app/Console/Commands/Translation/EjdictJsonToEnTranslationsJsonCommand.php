<?php

namespace App\Console\Commands\Translation;

use Illuminate\Console\Command;

use Illuminate\Support\Facades\File;



// ejdict.jsonから新しいen_translations.jsonファイルを生成（上書き）するコマンド。
class EjdictJsonToEnTranslationsJsonCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'en_translations:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'ejdict.jsonから新しいen_translations.jsonファイルを生成（上書き）する。';

    /**
     * Execute the console command.
     */
    public function handle()
    {

        // ejdict.jsonファイルの全単語の辞書を取得する。
        $jsonEjdict = File::json( public_path('dictionaries/ejdic-hand-json/ejdict.json') );

        // ['en' => 英単語, 'lower_en' => 全小文字化した英単語, 'ja' => 和訳]な形式に変換した配列を作る。
        $ejdictData = [];
        foreach ($jsonEjdict as $en => $ja) {
            $lower_en = strtolower($en);
            // 形式にする。
            $row = [
                'en' => $en,
                'lower_en' => $lower_en,
                'ja' => $ja,
            ];
            // $ejdictData[$lower_en]がすでにあれば、以下の優先で残す。
            // 1enが全て小文字。
            // 2enの先頭のみ大文字。
            // 3全て大文字。
            // 4その他。
            if ( isset($ejdictData[$lower_en]) ) {
                // 1 enが全て小文字。
                if ($en === $lower_en) {
                    $ejdictData[$lower_en] = $row;
                    continue;
                }
                if ($ejdictData[$lower_en]['en'] === $lower_en) continue;

                // 2 enの先頭のみ大文字。
                if ( $en === ucfirst($lower_en) ) {
                        $ejdictData[$lower_en] = $row;
                        continue;
                }
                if ( $ejdictData[$lower_en]['en'] === ucfirst($lower_en) ) continue;
                // 3 全て大文字。
                if ( $en === strtoupper($en) ) {
                    $ejdictData[$lower_en] = $row;
                    continue;
                }
                if ($ejdictData[$lower_en]['en'] === strtoupper($en)) continue;
            }

            // 4 その他。
            $ejdictData[$lower_en] = $row;

        }

        // 保存先enTranslations.jsonの全単語の辞書を取得。
        $savePath = public_path('dictionaries/enTranslations.json');
        $enTranslationsData = File::json($savePath);

        // 保存先のデータ配列に上書き追加していく。
        foreach ($ejdictData as $lower_en => $row) {
            $enTranslationsData[$lower_en] = $row;
        }

        // 保存のためjson化する。エスケープシーケンスはしない。
        $jsonEnTranslations = json_encode($enTranslationsData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

        // 保存を実行。
        file_put_contents($savePath, $jsonEnTranslations);
    }
}
