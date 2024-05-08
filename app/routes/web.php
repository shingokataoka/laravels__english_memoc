<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\http\Controllers\User\MainPageController;
use App\Http\Controllers\Api\ApiBookOrWordController;
use App\Http\Controllers\Api\ApiUserSettingController;
use App\Http\Controllers\User\UserSettingController;
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


Route::get('/test', function () {
    return Inertia::render('Test');
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware('auth')->group(function() {

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

    // user_setting系のリソースコントローラ。
    Route::resource('user_setting', UserSettingController::class);
});



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
