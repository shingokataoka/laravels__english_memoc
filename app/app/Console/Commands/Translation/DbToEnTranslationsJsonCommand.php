<?php

namespace App\Console\Commands\Translation;

use Illuminate\Console\Command;

use App\Models\EnJaTranslation;
use Illuminate\Support\Facades\File;



// en_translations.jsonファイルにDBの辞書データを追加（更新）するコマンド。
class DbToEnTranslationsJsonCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'en_translations:add';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'en_translations.jsonファイルにDBの辞書データを追加（更新）する。';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // まずDBの全ての単語を取得。
        $dbTranslations = EnJaTranslation::get()->keyBy('lower_en')->toArray();

        // DBの辞書が空なら処理しない。
        if (count($dbTranslations) === 0) dd('DBに新規の辞書データがありません。');

        // en_translations.jsonファイルの全ての単語を取得。
        $jsonTranslations = File::json( public_path('dictionaries/enTranslations.json') );

        // DB辞書データでループで、jsonファイルの辞書にDB辞書を追加する。
        foreach($dbTranslations as $lower_en => $row) {
            $jsonTranslations[$lower_en] = $row;
        }

        // DBのを追加した辞書データ配列をJson形式に変換する。
        $jsonData = json_encode($jsonTranslations, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

        // en_translations.jsonファイルに上書き保存する。
        $savePath = public_path('dictionaries/enTranslations.json');
        file_put_contents($savePath, $jsonData);

        // DBの辞書を全て消す。
        EnJaTranslation::truncate();
    }
}
