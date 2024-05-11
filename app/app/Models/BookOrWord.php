<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookOrWord extends Model
{
    use HasFactory;

    // 親（本）を返すリレーション。
    public function book() {
        return $this->belongsTo(BookOrWord::class, 'book_id', 'id')
            ->where('user_id', auth()->id() );
    }

    // 本の子（本か言葉）を返すリレーション。
    public function bookOrWords() {
        return $this->hasMany(BookOrWord::class, 'book_id', 'id')
            ->orderBy('sort_order_number')
            ->where('id', '<>', 1)
            ->where('user_id', auth()->id() );
    }


    // パンくずリスト用の本一覧を返す。
    public function booksOfBreadCrumb() {
        $book = BookOrWord::find($this->id);
        $booksOfBreadCrumb = [$book];
        for ( $i=0; $i<20; $i++ ) {
            $parentBook = $booksOfBreadCrumb[$i]->book;
            if (!$parentBook) break;
            if ( $parentBook->id === 1 ) break;
            $booksOfBreadCrumb[] = $parentBook;
        }
        $booksOfBreadCrumb[] = BookOrWord::find(1);

        $booksOfBreadCrumb = array_reverse($booksOfBreadCrumb);
        return $booksOfBreadCrumb;
    }
}
