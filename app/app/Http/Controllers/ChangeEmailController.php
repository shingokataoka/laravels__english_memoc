<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use App\Models\EmailReset;
use App\Models\User;

use Inertia\Inertia;
use Illuminate\Support\Str;
use Carbon\Carbon;



class ChangeEmailController extends Controller
{

    // DBに新規希望メルアドとトークンを保存して、
    // メルアド確認メールを送信して、
    // メルアド変更の入力ページにリダイレクト移動する。
    public function sendChangeEmailLink(Request $request)
    {

        $new_email = $request->email;

        // 同じメルアドのユーザーがいればエラー。
        if ( User::where('email', $new_email)->exists() ) {
            session()->flash('email_update_status', 'error');
            session()->flash('email_update_message', 'すでに存在するメールアドレスです。');
            return to_route('profile.edit');
        }

        // トークン生成。
        $token = hash_hmac(
            'sha256',
            Str::random(40) . $new_email,
            config('app.key'),
        );


        DB::beginTransaction();
        try {
            // DBにすでに、前回申請ぶんの新しいメルアドとトークンがあれば消しておく。
            EmailReset::where( 'user_id', auth()->id() )->delete();

            // 新しいメルアドとトークンを保存。
            $params = [];
            $params['user_id'] = auth()->id();
            $params['new_email'] = $new_email;
            $params['token'] = $token;
            $email_reset = EmailReset::create($params);
            DB::commit();

            // 確認メールを送信する。
            $email_reset->sendEmailResetNotification($token);
            session()->flash('email_update_status', 'success');
            session()->flash('email_update_message', "上記メールアドレスに確認メールを送信しました。\r\nメールの内容に従い、メールアドレスが正しい事をお知らせください。");

        } catch (\Exception $e) {
            DB::rollback();
            session()->flash('email_update_status', 'error');
            session()->flash('email_update_message', "エラーが発生しました。\r\nすいませんが、もう一度お試しください。");
        }

        return to_route('profile.edit');
    }



    // 新規メールアドレスに設定する処理。
    public function reset(Request $request, $token)
    {
        $email_reset = EmailReset::where('token', $token)->first();

        // 存在しないなら404。
        if ( empty($email_reset) ) return abort(404);
        // ログインユーザーのでないなら404。
        if ( $email_reset->user_id.'' !== auth()->id().'') return abort(404);

        // トークン切れ=true,切れていない=false を取得。
        $expiredSec = 60 * config('auth.passwords.users.expire');
        $isExpired = Carbon::parse($email_reset->created_at)
            ->addSeconds($expiredSec)
            ->isPast();

        // トークンが切れていないなら
        if (!$isExpired) {
            // ユーザーのメールアドレスを更新する。
            $user = auth()->user();
            $user->email = $email_reset->new_email;
            $user->save();
            // 更新のフラッシュをセットする。
            session()->flash('status', 'success');
            session()->flash('message', 'メールアドレスの変更が完了しました。');

        // トークン切れなら。
        } else {
            // エラーのフラッシュをセットする。
            session()->flash('status', 'error');
            session()->flash('message', "メールアドレスの変更に失敗しました。\r\nお手数ですが、最初から操作をやり直してください。");
        }

        // 新規メルアドとトークンのレコードをDBから削除する。
        $email_reset->delete();

        // プロフィール設定ページにリダイレクト移動する。
        return Inertia::location( route('profile.edit') );

    }
}
