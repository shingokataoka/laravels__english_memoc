<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Requests\BookOrWordRequest;

use App\Models\BookOrWord;

class ApiBookOrWordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BookOrWordRequest $request)
    {
        $userId = auth()->id();

        // 追加保存する。
        $bookOrWord = new BookOrWord();
        $bookOrWord->user_id = $userId;
        $bookOrWord->book_id = $request->book_id;
        $bookOrWord->sort_order_number = $request->sort_order_number;
        $bookOrWord->type_is_book = $request->type_is_book;
        $bookOrWord->english_word = $request->english_word ?? '';
        $bookOrWord->japanese_word = $request->japanese_word ?? '';
        $bookOrWord->save();

        // 追加保存したレコードを返す
        return $bookOrWord;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BookOrWordRequest $request, string $id)
    {
        $bookOrWord = BookOrWord::findOrFail($id);

        // 現在ユーザーのbookOrWordでないならエラー。
        $userId = auth()->id();
        if ($bookOrWord->user_id !== $userId) return abort(404);

        // 値を書き換える。
        $bookOrWord->english_word = $request->english_word ?? '';
        $bookOrWord->japanese_word = $request->japanese_word ?? '';
        // updateを実行。
        $bookOrWord->save();
        // 成功を返す。
        return 1;
    }



    // 本内のセリフor本の並び順を更新する。
    public function allSortUpdate(Request $request) {
        foreach ( $request->bookOrWords as $row ) {
            $bookOrWord = BookOrWord::findOrFail($row['id']);
            $bookOrWord->sort_order_number = $row['sort_order_number'];
            $bookOrWord->save();
        }

        return 1;
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $bookOrWord = BookOrWord::findOrFail($id);
        $bookOrWord->delete();

        return 1;
    }
}
