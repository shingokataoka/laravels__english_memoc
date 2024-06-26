<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// メール検証に必要なクラスをuseする。
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

// メール更新時のメール検証を自前するのに必要なクラスをuseする。
use App\Http\Controllers\ChangeEmailController;

use App\Http\Controllers\User\MainPageController;
use App\Http\Controllers\Api\ApiBookOrWordController;
use App\Http\Controllers\Api\ApiUserSettingController;

use App\Http\Controllers\Api\ApiTranslationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', function () {
    return Inertia::render('Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware(['auth', 'verified'])->group(function() {

    Route::get('/top', [MainPageController::class, 'index'])
        ->name('main.top');
    Route::get('/book/{book_id}', [MainPageController::class, 'show'])
        ->name('main.book');

    // bookOrWordをDBへ更新する処理。
    Route::put('/api/book/{book_id}', [ApiBookOrWordController::class, 'update'])
        ->name('api.book.update');
    // bookOrWordをDBに追加する処理。
    Route::post('/api/book', [ApiBookOrWordController::class, 'store'])
        ->name('api.book.store');
    // 本内のソート順sort_order_numberを更新する処理。
    Route::patch('api/book/sort_update', [ApiBookOrWordController::class, 'allSortUpdate'])
        ->name('api.book.all_sort_update');
    // BookOrWordをDBから削除する処理。
    Route::delete('api/book/{book_id}', [ApiBookOrWordController::class, 'destroy'])
        ->name('api.book.delete');

    // DBのuser_settingsを更新する処理。
    Route::name('api.')->group(function(){
        Route::resource('api/user_setting', ApiUserSettingController::class);
    });

    // みんなの翻訳を使うクラスのルーティング。
    Route::prefix('api_translation_')->name('api.translation.')->group(function(){
        // 英文を和訳にして返す。
        Route::post('english_to_japanese', [ApiTranslationController::class, 'fetchEnglishToJapanese'])
            ->name('english_to_japanese');
        // 和文を英訳にして返す。
        Route::post('japanese_to_english', [ApiTranslationController::class, 'fetchJapaneseToEnglish'])
            ->name('japanese_to_english');
    });
});





// メール検証関連のルーティング。
Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect('/home');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

Route::get('test', function () {return view('emails.changeEmail'); });

Route::middleware(['auth'])->group(function (){

    // メルアド更新のメルアド確認メールを送信のルーティング。
    Route::patch('/email/update', [ChangeEmailController::class, 'sendChangeEmailLink'])
        ->name('email.update');

    // 新規メールアドレスに更新のルーティング。
    Route::get('reset/{token}', [ChangeEmailController::class, 'reset'])
        ->name('email.reset');
});




// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
