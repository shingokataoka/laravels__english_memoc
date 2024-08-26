<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;

use App\Models\BookOrWord;



class BookController extends Controller
{

    public function __construct() {
        $this->middleware( function ($request, $next){
            $book_id = request()->route()->originalParameters()['book_id'];
            // 本の中身のセリフ数を取得。
            $bookOrWordsCount = BookOrWord::where('book_id', '=', $book_id)
                ->where('type_is_book', '=', 0)
                ->count();
            // この本の親本のidを取得。
            $parentBookId = (int)BookOrWord::find($book_id)->book_id;
            // 親本IDが1より上なら、親本のURLを取得。
            if ($parentBookId > 1) { $backUrl = route('main.book', ["book_id" => $parentBookId]); }
            // 親本IDが1ならトップのメインページのURLを取得。
            else { $backUrl = route('main.top'); }
            // セリフがなければ、「まだ本の中身にセリフがありません。」なJSXをレンダリング。
            // 「戻る」用のURLとして$backUrlを渡す。
            if ($bookOrWordsCount === 0) return Inertia::render('User/Books/NoneWord', compact('backUrl'));

            return $next($request);
        } );
    }

    // 本の中身を和訳していく問題回答するページ。
    public function japanese_translation($book_id)
    {
        // 本の中身を取得。
        $bookOrWords = BookOrWord::where('book_id', '=', $book_id)
            ->where('type_is_book', '=', 0)
            ->orderBy('sort_order_number')->get();

        // この本の親本のidを取得。
        $parentBook = BookOrWord::find($book_id)->book;
        $parentBookId =($parentBook === null)? null : $parentBook->id;

        return Inertia::render('User/Books/JapaneseTranslation', compact('bookOrWords', 'parentBookId'));
    }



    // 本の中身を英訳していく問題回答するページ。
    public function english_translation($book_id)
    {
        // 本の中身を取得する。
        $bookOrWords = BookOrWord::where('book_id', '=', $book_id)
            ->where('type_is_book', '=', 0)
            ->orderBy('sort_order_number')->get();

        // 親本のIDを取得する。
        $parentBook = BookOrWord::find($book_id)->book;
        $parentBookId =($parentBook === null)? null : $parentBook->id;

        return Inertia::render('User/Books/EnglishTranslation', compact('bookOrWords', 'parentBookId'));
    }



    // 本の中身を聞き取り英語にしていく問題回答するページ。
    public function listening($book_id)
    {
        // 本の中身を取得する。
        $bookOrWords = BookOrWord::where('book_id', '=', $book_id)
            ->where('type_is_book', '=', 0)
            ->orderBy('sort_order_number')->get();

        // 親本のIDを取得する。
        $parentBook = BookOrWord::find($book_id)->book;
        $parentBookId =($parentBook === null)? null : $parentBook->id;

        return Inertia::render('User/Books/Listening', compact('bookOrWords', 'parentBookId'));
    }
}
