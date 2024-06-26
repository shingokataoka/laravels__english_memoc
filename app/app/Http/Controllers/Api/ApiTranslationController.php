<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Libraries\MinnaTranslation;






class ApiTranslationController extends Controller
{


    // 英文を和訳して返す。
    public function fetchEnglishToJapanese(Request $request)
    {
        $englishText = $request->post('englishText');
        $japaneseText = MinnaTranslation::fetchEnglishToJapanese($englishText);
        return $japaneseText;
    }





    // 和文を英訳して返す。
    public function fetchJapaneseToEnglish(Request $request)
    {
        $japaneseText = $request->post('japaneseText');
        $englishText = MinnaTranslation::fetchJapaneseToEnglish($japaneseText);
        return $englishText;
    }

}
