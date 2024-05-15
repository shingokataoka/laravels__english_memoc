<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

// メール検証実装に必要はクラスをuseしている。
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {

        // メルアド確認メールの、テキストを日本語にする。
        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            return (new MailMessage)
                ->subject( config('app.name') .  ' - メールアドレスの確認' )
                ->line('下のボタンをクリックしてください。メールアドレスが正しい事が送信されます。')
                ->action('メールアドレスの確認', $url);
        });

    }
}
