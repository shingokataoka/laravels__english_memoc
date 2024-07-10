<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TalkToAppController extends Controller
{
    // アプリの声を選択するページ。
    public function selectVoice()
    {
        dd(__FUNCTION__);
    }



    // アプリと会話するページ。
    public function index()
    {
        dd(__FUNCTION__);
    }
}
