<?php
namespace App\Services;

use App\Models\BookOrWord;





// 見本の本やセリフ集を生成するためのクラス。
// 新規会員登録の時に生成する用。
class SampleWord
{

    protected static $books = [
        ["I am 〇〇" , "私は〇〇。"],
        [
            ["Occupation part 1", "職業1"],
            [
                ["I am a singer." , "私は（形ある単数の）歌手です。"],
                ["I'm a singer." , "私は（形ある単数の）歌手です。"],
                ["I am not a singer." , "私は歌手じゃないです。"],
                ["I'm not a singer." , "私は歌手じゃないです。"],

                ["I am a doctor." , "私は（形ある単数の）医者です。"],
                ["I'm a doctor." , "私は（形ある単数の）医者です。"],
                ["I am not a doctor." , "私は医者じゃないです。"],
                ["I'm not a doctor." , "私は医者じゃないです。"],

                ["I am a dentist." , "私は（形ある単数の）歯医者です。"],
                ["I'm a dentist." , "私は（形ある単数の）歯医者です。"],
                ["I am not a dentist." , "私は歯医者じゃないです。"],
                ["I'm not a dentist." , "私は歯医者じゃないです。"],

                ["I am a veterinarian." , "私は（形ある単数の）獣医です。"],
                ["I'm a veterinarian." , "私は（形ある単数の）獣医です。"],
                ["I am not a veterinarian." , "私は獣医じゃないです。"],
                ["I'm not a veterinarian." , "私は獣医じゃないです。"],

                ["I am a nurse." , "私は（形ある単数の）看護師です。"],
                ["I'm a nurse." , "私は（形ある単数の）看護師です。"],
                ["I am not a nurse." , "私は看護師じゃないです。"],
                ["I'm not a nurse." , "私は看護師じゃないです。"],

                ["I am a pharmacist." , "私は（形ある単数の）薬剤師です。"],
                ["I'm a pharmacist." , "私は（形ある単数の）薬剤師です。"],
                ["I am not a pharmacist." , "私は薬剤師じゃないです。"],
                ["I'm not a pharmacist." , "私は薬剤師じゃないです。"],

                ["I am a police officer." , "私は（形ある単数の）警察官です。"],
                ["I'm a police officer." , "私は（形ある単数の）警察官です。"],
                ["I am not a police officer." , "私は警察官じゃないです。"],
                ["I'm not a police officer." , "私は警察官じゃないです。"],

                ["I am a firefighter." , "私は（形ある単数の）消防士です。"],
                ["I'm a firefighter." , "私は（形ある単数の）消防士です。"],
                ["I am not a firefighter." , "私は消防士じゃないです。"],
                ["I'm not a firefighter." , "私は消防士じゃないです。"],

                ["I am a politician." , "私は（形ある単数の）政治家です。"],
                ["I'm a politician." , "私は（形ある単数の）政治家です。"],
                ["I am not a politician." , "私は政治家じゃないです。"],
                ["I'm not a politician." , "私は政治家じゃないです。"],

                ["I am a lawyer." , "私は（形ある単数の）弁護士です。"],
                ["I'm a lawyer." , "私は（形ある単数の）弁護士です。"],
                ["I am not a lawyer." , "私は弁護士じゃないです。"],
                ["I'm not a lawyer." , "私は弁護士じゃないです。"],

                ["I am a accountant." , "私は（形ある単数の）会計士です。"],
                ["I'm a accountant." , "私は（形ある単数の）会計士です。"],
                ["I am not a accountant." , "私は会計士じゃないです。"],
                ["I'm not a accountant." , "私は会計士じゃないです。"],

                ["I am a tax accountant." , "私は（形ある単数の）税理士です。"],
                ["I'm a tax accountant." , "私は（形ある単数の）税理士です。"],
                ["I am not a tax accountant." , "私は税理士じゃないです。"],
                ["I'm not a tax accountant." , "私は税理士じゃないです。"],

                ["I am a bank employee." , "私は（形ある単数の）銀行員です。"],
                ["I'm a bank employee." , "私は（形ある単数の）銀行員です。"],
                ["I am not a bank employee." , "私は銀行員じゃないです。"],
                ["I'm not a bank employee." , "私は銀行員じゃないです。"],

                ["I am a professor." , "私は（形ある単数の）教授です。"],
                ["I'm a professor." , "私は（形ある単数の）教授です。"],
                ["I am not a professor." , "私は教授じゃないです。"],
                ["I'm not a professor." , "私は教授じゃないです。"],

                ["I am a teacher." , "私は（形ある単数の）先生です。"],
                ["I'm a teacher." , "私は（形ある単数の）先生です。"],
                ["I am not a teacher." , "私は先生じゃないです。"],
                ["I'm not a teacher." , "私は先生じゃないです。"],
            ],
            ["Occupation part 2", "職業2"],
            [
                ["I am a newspaper reporter." , "私は（形ある単数の）新聞記者です。"],
                ["I'm a newspaper reporter." , "私は（形ある単数の）新聞記者です。"],
                ["I am not a newspaper reporter." , "私は新聞記者じゃないです。"],
                ["I'm not a newspaper reporter." , "私は新聞記者じゃないです。"],

                ["I am a painter." , "私は（形ある単数の）画家です。"],
                ["I'm a painter." , "私は（形ある単数の）画家です。"],
                ["I am not a painter." , "私は画家じゃないです。"],
                ["I'm not a painter." , "私は画家じゃないです。"],

                ["I am a artist." , "私は（形ある単数の）芸術家です。"],
                ["I'm a artist." , "私は（形ある単数の）芸術家です。"],
                ["I am not a artist." , "私は芸術家じゃないです。"],
                ["I'm not a artist." , "私は芸術家じゃないです。"],

                ["I am a manga artist." , "私は（形ある単数の）漫画家です。"],
                ["I'm a manga artist." , "私は（形ある単数の）漫画家です。"],
                ["I am not a manga artist." , "私は漫画家じゃないです。"],
                ["I'm not a manga artist." , "私は漫画家じゃないです。"],

                ["I am a employee." , "私は（形ある単数の）会社員です。"],
                ["I'm a employee." , "私は（形ある単数の）会社員です。"],
                ["I am not a employee." , "私は会社員じゃないです。"],
                ["I'm not a employee." , "私は会社員じゃないです。"],

                ["I am a office worker." , "私は（形ある単数の）事務職員です。"],
                ["I'm a office worker." , "私は（形ある単数の）事務職員です。"],
                ["I am not a office worker." , "私は事務職員じゃないです。"],
                ["I'm not a office worker." , "私は事務職員じゃないです。"],

                ["I am a engineer." , "私は（形ある単数の）エンジニアです。"],
                ["I'm a engineer." , "私は（形ある単数の）エンジニアです。"],
                ["I am not a engineer." , "私はエンジニアじゃないです。"],
                ["I'm not a engineer." , "私はエンジニアじゃないです。"],

                ["I am a craftsman." , "私は（形ある単数の）職人です。"],
                ["I'm a craftsman." , "私は（形ある単数の）職人です。"],
                ["I am not a craftsman." , "私は職人じゃないです。"],
                ["I'm not a craftsman." , "私は職人じゃないです。"],

                ["I am a carpenter." , "私は（形ある単数の）大工です。"],
                ["I'm a carpenter." , "私は（形ある単数の）大工です。"],
                ["I am not a carpenter." , "私は大工じゃないです。"],
                ["I'm not a carpenter." , "私は大工じゃないです。"],

                ["I am a farmer." , "私は（形ある単数の）農場経営者です。"],
                ["I'm a farmer." , "私は（形ある単数の）農場経営者です。"],
                ["I am not a farmer." , "私は農場経営者じゃないです。"],
                ["I'm not a farmer." , "私は農場経営者じゃないです。"],

                ["I am a fisherman." , "私は（形ある単数の）漁師です。"],
                ["I'm a fisherman." , "私は（形ある単数の）漁師です。"],
                ["I am not a fisherman." , "私は漁師じゃないです。"],
                ["I'm not a fisherman." , "私は漁師じゃないです。"],

                ["I am a attendant," , "私は（形ある単数の）接客係です。"],
                ["I'm a attendant," , "私は（形ある単数の）接客係です。"],
                ["I am not a attendant," , "私は接客係じゃないです。"],
                ["I'm not a attendant," , "私は接客係じゃないです。"],

                ["I am a cashier." , "私は（形ある単数の）レジ係です。"],
                ["I'm a cashier." , "私は（形ある単数の）レジ係です。"],
                ["I am not a cashier." , "私はレジ係じゃないです。"],
                ["I'm not a cashier." , "私はレジ係じゃないです。"],

                ["I am a barber." , "私は（形ある単数の）理髪師です。"],
                ["I'm a barber." , "私は（形ある単数の）理髪師です。"],
                ["I am not a barber." , "私は理髪師じゃないです。"],
                ["I'm not a barber." , "私は理髪師じゃないです。"],

                ["I am a soldier." , "私は（形ある単数の）兵士です。"],
                ["I'm a soldier." , "私は（形ある単数の）兵士です。"],
                ["I am not a soldier." , "私は兵士じゃないです。"],
                ["I'm not a soldier." , "私は兵士じゃないです。"],
            ],
            ["Occupation part 3", "職業3"],
            [
                ["I am a astronaut." , "私は（形ある単数の）宇宙飛行士です。"],
                ["I'm a astronaut." , "私は（形ある単数の）宇宙飛行士です。"],
                ["I am not a astronaut." , "私は宇宙飛行士じゃないです。"],
                ["I'm not a astronaut." , "私は宇宙飛行士じゃないです。"],

                ["I am a pilot." , "私は（形ある単数の）パイロットです。"],
                ["I'm a pilot." , "私は（形ある単数の）パイロットです。"],
                ["I am not a pilot." , "私はパイロットじゃないです。"],
                ["I'm not a pilot." , "私はパイロットじゃないです。"],

                ["I am a flight attendant." , "私は（形ある単数の）客室乗務員です。"],
                ["I'm a flight attendant." , "私は（形ある単数の）客室乗務員です。"],
                ["I am not a flight attendant." , "私は客室乗務員じゃないです。"],
                ["I'm not a flight attendant." , "私は客室乗務員じゃないです。"],

                ["I am a driver." , "私は（形ある単数の）運転手です。"],
                ["I'm a driver." , "私は（形ある単数の）運転手です。"],
                ["I am not a driver." , "私は運転手じゃないです。"],
                ["I'm not a driver." , "私は運転手じゃないです。"],

                ["I am a clerk." , "私は（形ある単数の）店員です。"],
                ["I'm a clerk." , "私は（形ある単数の）店員です。"],
                ["I am not a clerk." , "私は店員じゃないです。"],
                ["I'm not a clerk." , "私は店員じゃないです。"],

                ["I am a housewife." , "私は（形ある単数の）主婦です。"],
                ["I'm a housewife." , "私は（形ある単数の）主婦です。"],
                ["I am not a housewife." , "私は主婦じゃないです。"],
                ["I'm not a housewife." , "私は主婦じゃないです。"],

            ],

            ["Self introduction", "自己紹介"],
            [
                ["I am Asami." , "私はアサミです。"],
                ["I'm Asami." , "私はアサミです。"],
                ["I am not Asami." , "私はアサミじゃないです。"],
                ["I'm not Asami." , "私はアサミじゃないです。"],
                ["I am twenty-nine years old.", "私は二十九歳です。"],
                ["I am 29 years old.", "私は二十九歳です。"],
                ["I am from Japan." , "私は日本出身です。"],
                ["I'm from Japan." , "私は日本出身です。"],
                ["I am not from Japan." , "私は日本出身じゃないです。"],
                ["I'm not from Japan." , "私は日本出身じゃないです。"],
                ["I am from Hokkaido." , "私は北海道出身です。"],
                ["I'm from Hokkaido." , "私は北海道出身です。"],
                ["I am not from Hokkaido." , "私は北海道出身じゃないです。"],
                ["I'm not from Hokkaido." , "私は北海道出身じゃないです。"],

                ["I am a human." , "私は（形ある単数の）人間です。"],
                ["I am a human." , "私は（形ある単数の）人間です。"],
                ["I am human." , "私は人間です。（humanは「性質上が人間」という意味もあるので、a（形ある単数）がなくてもOK）"],
                ["I am not human" , "私は人間じゃないです。"],
                ["I am a woman." , "私は(形ある単数の)女性です。(woman=女性の人間、よって数えれるからaが必要)"],
                ["I am female." , "私は女性です。(female=性の状態が女、よってaを付けない)"],
                ["I am a man." , "私は(形ある単数の)男性です。(man=男性の人間、よって数えれるからaが必要)"],
                ["I am male." , "私は男性です。(male=性の状態が男、よってaを付けない)"],
            ],

            ["Self-evaluation", "自己評価"],
            [
                ["I am strong." , "私は強いです。"],
                ["I'm strong." , "私は強いです。"],
                ["I am not strong." , "私は強いないです。"],
                ["I'm not strong." , "私は強いないです。"],
                ["I am young." , "私は若いです。"],
                ["I'm young." , "私は若いです。"],
                ["I am not young." , "私は若くないです。"],
                ["I'm not young." , "私は若くないです。"],
                ["I am cute." , "私は可愛いです。"],
                ["I'm cute." , "私は可愛いです。"],
                ["I am not cute." , "私は可愛くないです。"],
                ["I'm not cute." , "私は可愛くないです。"],
                ["I am lucky." , "私は幸運です。"],
                ["I am not lucky." , "私は幸運じゃないです。"],
                ["I am unlucky." , "私は不運です。"],
                ["I am not unlucky." , "私は不運じゃないです。"],
                ["I am right." , "私は正しいです。"],
                ["I'm right." , "私は正しいです。"],
                ["I am not right." , "私は正しくないです。"],
                ["I'm not right." , "私は正しくないです。"],
                ["I am smart", "私は賢いです。"],
                ["I am very smart", "私はとても賢いです。"],
                ["I am genius", "私は天才です。"],
            ],

            ["My physical condition", "私の体調"],
            [
                ["I am sleepy." , "私は眠いです。"],
                ["I'm sleepy." , "私は眠いです。"],
                ["I am not sleepy." , "私は眠たくないです。"],
                ["I'm not sleepy." , "私は眠たくないです。"],
                ["I am OK." , "私は大丈夫です。"],
                ["I'm OK." , "私は大丈夫です。"],
                ["I am not OK." , "私は大丈夫じゃないです。"],
                ["I'm not OK." , "私は大丈夫じゃないです。"],
                ["I am fine." , "私は元気です。"],
                ["I'm fine." , "私は元気です。"],
                ["I am not fine." , "私は元気じゃないです。"],
                ["I'm not fine." , "私は元気じゃないです。"],
            ],

            ["joy, anger, sadness, fun", "喜び、怒り、悲しみ、楽しみ（喜怒哀楽）"],
            [
                ["I am glad." , "私は嬉しいです。"],
                ["I'm glad." , "私は嬉しいです。"],
                ["I am angry." , "私は怒っています。"],
                ["I'm angry." , "私は怒っています。"],
                ["I am not angry." , "私は怒っていません。"],
                ["I'm not angry." , "私は怒っていません。"],
                ["I am annoyed." , "私はイライラしています。"],
                ["I'm annoyed." , "私はイライラしています。"],
                ["I am not annoyed." , "私はイライラしていません。"],
                ["I'm not annoyed." , "私はイライラしていません。"],
                ["I am indignant." , "私は憤慨してます(不正や不公平な行為への怒り)。"],
                ["I'm indignant." , "私は憤慨してます(不正や不公平な行為への怒り)。"],
                ["I am not indignant." , "私は憤慨していません。"],
                ["I'm not indignant." , "私は憤慨していません。"],
                ["I am sad." , "私は悲しいです。"],
                ["I'm sad." , "私は悲しいです。"],
                ["I am not sad." , "私は悲しくないです。"],
                ["I'm not sad." , "私は悲しくないです。"],
                ["I am sorrowful." , "私は哀しいです。（切ないも含む）"],
                ["I'm sorrowful." , "私は哀しいです。（切ないも含む）"],
                ["I am not sorrowful." , "私は哀しいです。（切ないも含む）"],
                ["I'm not sorrowful." , "私は哀しいです。（切ないも含む）"],
                ["I am excited." , "私はワクワクしてます。（何かにワクワクさせられている状態。\r\n例えば見ている映画とかに興奮させられている状態）"],
                ["I'm excited." , "私はワクワクしてます。（何かにワクワクさせられている状態。\r\n例えば見ている映画とかに興奮させられている状態）"],
                ["I am not excited." , "私はワクワクしていません。"],
                ["I'm not excited." , "私はワクワクしていません。"],
            ],

            ["other emotions", "他の感情"],
            [
                ["I am happy." , "私は幸せです。"],
                ["I'm happy." , "私は幸せです。"],
                ["I am nervous." , "私は緊張してます。（緊張気味・ドキドキしている状態）"],
                ["I am tense." , "私は緊張(緊迫)してます。(一触即発的な雰囲気の緊張感)"],
                ["I am not happy." , "私は幸せじゃないです。"],
                ["I'm not happy." , "私は幸せじゃないです。"],
                ["I am depressed." , "私は憂鬱(ゆううつ)です。"],
                ["I'm depressed." , "私は憂鬱(ゆううつ)です。"],
                ["I am not depressed." , "私は憂鬱(ゆううつ)ではないです。"],
                ["I'm not depressed." , "私は憂鬱(ゆううつ)ではないです。"],
                ["I am cheerful." , "私は陽気です。（機嫌がいい的な感じ）"],
                ["I am impressed." , "私は私は感心する。"],
                ["I am anxious." , "私は心配だ。（将来起こることを心配している）"],
                ["I am uneasy." , "私は不安だ。（良くないこと・嫌なことが起こるような気がして落ち着かない・不安な気持ち）"],
                ["I am regretful." , "私は悔しい。"],
            ],
        ],

        ["morning", "朝"],
        [
            ["good morning.", "おはよう。"],
            ["I wash my face.", "私は顔を洗います。"],
            ["I brush my teeth.", "私は歯を磨きます。"],
            ["I eat breakfast.", "私は朝食を食べます。"],
            ["I will eat breakfast.", "私は朝食を食べるつもりです。"],
            ["I'm going to work now.", "私は今から仕事に行きます。"],
        ],

        ["afternoon", "昼"],
        [
            ["I am on a lunch break now.", "私は今昼休みです。"],
            ["I eat lunch.", "私は昼食を食べます。"],
            ["I will eat lunch.", "私は昼食を食べるつもりです。"],
            ["I'll eat lunch.", "私は昼食を食べるつもりです。I willの省略がI'll"],
            ["I took a nap.", "私は昼寝した。"],
            ["I want to take a nap.", "私は昼寝したい。"],
        ],

        ["evening", "夕方"],
        [
            ["I’m back.", "ただいま。（普通の帰宅時）"],
            ["Hey, Mom.", "おかえりママ。（普通の帰宅ただいまへの返答）"],
            ["I’m home.", "ただいま。（久しぶりの帰宅時）"],
            ["Dad, welcome back.", "パパ、おかえりなさい。（久しぶりの帰宅ただいまへの返答）"],
            ["I'm back from America.", "アメリカから帰ってきたよ。"],
            ["Hey, how was it?", " おかえり。どうだった？"],
            ["I eat dinner.", "私は夕食を食べます。"],
            ["I will eat dinner.", "私は夕食を食べるつもりです。"],
            ["I'll eat dinner.", "私は夕食を食べるつもりです。I willの省略がI'll"],
        ],

        ["night", "夜"],
        [
            ["I take a bath", "私はお風呂に入ります。"],
            ["Dad, I got out of the bath.", "お父さん、私はお風呂から出たよ。"],
            ["I finished taking a bath.", "お風呂を入り終えました。"],
            ["Good night, mom.", "おやすみ、ママ。"],
            ["Good night, too!", "おやすみ（おやすみへの返答）"],
        ],
    ];



    // 上記の配列の本とセリフを全て作成。
    public static function create($userId){
        // トップページはparent_id=1
        $parentBookId = 1;
        self::createInBook($userId, $parentBookId, self::$books);
    }


    // 上記のサンプルをユーザーのトップページから再起的に追加する。
    public static function createInBook($userId, $parentBookId, $books){
        /*
        トップの要素は親parent_idが1（トップページ=1だから）。
            次が配列でないなら、parent_id内にinsertする。
            次が配列なら、parent_id内に本をisertする。
            再起的に、この本が親parent_idになる。
                次が配列でないなら、parent_id内にinsertする。
                次が配列なら、parent_id内に本をisertする。
                再起的に繰り返される。
        */
        $sort_order_number = 0;
        for ($i=0; $i < count($books); $i++) {
            $currentRow = $books[$i];
            $nextRow =(empty($books[$i+1]))? null : $books[$i+1];

            $params = [];
            $params['user_id'] = $userId;
            $params['book_id'] = $parentBookId;
            $params['sort_order_number'] = ++$sort_order_number;
            $params['english_word'] = $currentRow[0];
            $params['japanese_word'] = $currentRow[1];
            // 次が多重配列なら本。
            if (!is_null($nextRow) && is_array($nextRow[0]) ) {
                // DBに本として追加。
                $params['type_is_book'] = true;
                $createdBook = BookOrWord::create($params);
                // この本に中身を再起的に入れていく。
                self::createInBook($userId, $createdBook->id, $nextRow);
                // 次の行がこの本なので、飛ばす。
                $i++;
                continue;
            }
            // 本でないならセリフを追加する。
            $params['type_is_book'] = false;
            $createdBook = BookOrWord::create($params);
        }
    }
}
