<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Notifications\ChangeEmailNotification;
use Illuminate\Notifications\Notifiable;





class EmailReset extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'user_id',
        'new_email',
        'token',
    ];


    // 新規メールアドレス確認用のメールを送信する。
    public function sendEmailResetNotification($token)
    {
        $this->notify( new ChangeEmailNotification($token) );
    }



    // 上記の確認用のメールの送信先アドレスを、新規メールアドレスに設定。
    public function routeNotificationForMail($notification)
    {
        return $this->new_email;
    }


}
