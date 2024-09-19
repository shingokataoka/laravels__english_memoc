<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\BookOrWord;
use App\Services\SampleWord;




class BookOrWordController extends Controller
{


    public function reset()
    {
        $userId = auth()->id();

        // user_id=1なら処理しない。
        if ($userId === 1) {
            abort(404);
            exit;
        }

        // まず、ユーザーのbook_or_wordsのレコードを全て消す。
        BookOrWord::where('user_id', $userId)->delete();
        // ユーザーのbook_or_wordsの初期のサンプルを挿入する。
        SampleWord::create($userId);

        // 本一覧メインのトップページにリダイレクトする。
        return to_route('main.top');
    }
}
