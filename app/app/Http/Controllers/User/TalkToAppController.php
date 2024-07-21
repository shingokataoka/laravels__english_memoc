<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;


class TalkToAppController extends Controller
{

    // アプリと会話するページ。
    public function index()
    {
        // route()のパラメータから声のindex番号を取得。
        $appVoiceIndex = request()->route()->originalParameters()['appVoiceIndex'];
        $userVoiceIndex = request()->route()->originalParameters()['userVoiceIndex'];

        return Inertia::render('User/TalkToApp', compact('appVoiceIndex', 'userVoiceIndex'));
    }



    // アプリの声を選ぶページ。
    // （アプリと会話するページのアプリの声）。
    public function voiceSelect()
    {
        return Inertia::render('User/TalkToAppVoiceSelect');
    }



    // ユーザーの声を選ぶページ。
    // （アプリと会話するページのユーザーの声）。
    public function userVoiceSelect()
    {
        $appVoiceIndex = request()->route()->originalParameters()['appVoiceIndex'];
        return Inertia::render('User/TalkToUserVoiceSelect', compact('appVoiceIndex'));
    }
}
