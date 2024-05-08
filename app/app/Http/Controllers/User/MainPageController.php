<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\BookOrWord;
use Inertia\Inertia;

class MainPageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $bookOrWords = $user->bookOrWords;

        return Inertia::render('User/TopPage')->with([
            'bookOrWords' => $bookOrWords,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        dd(__FUNCTION__);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        dd(__FUNCTION__);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $book_id)
    {
        $book = BookOrWord::find($book_id);
        $bookOrWords = $book->bookOrWords;
        $booksOfBreadCrumb = $book->booksOfBreadCrumb();

        // パンくずリスト用の本or言葉 一覧。
        return Inertia::render('User/BookPage')->with([
            'book' => $book,
            'bookOrWords' => $bookOrWords,
            'booksOfBreadCrumb' => $booksOfBreadCrumb,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        dd(__FUNCTION__);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        dd(__FUNCTION__);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        dd(__FUNCTION__);
    }
}
