<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use App\Notifications\VerifyEmailNotification;

use App\Models\BookOrWord;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    public function SendEmailVerificationNotification()
    {
        $this->notify( new VerifyEmailNotification() );
    }



    public function user_setting()
    {
        return $this->hasOne(UserSetting::class);
    }

    // userの所有するトップページの本と言葉を取得。
    public function bookOrWords()
    {
        return $this->hasMany(BookOrWord::class)
            ->where('id', '<>', 1)
            ->where('book_id', '1')
            ->orderBy('sort_order_number');
    }
}
