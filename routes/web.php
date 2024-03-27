<?php

use App\Http\Controllers\Web\EventController;
use App\Http\Controllers\Web\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

//Route::get("/events", function() {
//    return Inertia::render('Events', [
//        'events' => Http::get('http://127.0.0.1:8000/api/event')->json()
//    ]);
//});


Route::prefix('users')->middleware(['auth'])->group(function () {
    Route::get('/', [\App\Http\Controllers\Web\Admin\UserController::class, 'index'])->name('users.index');
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


//events
Route::get('/events/add', [\App\Http\Controllers\Web\EventController::class, 'create'])->middleware(['auth', 'verified'])->name('test');
Route::get('/events', [\App\Http\Controllers\Web\EventController::class, 'index'])->middleware(['auth', 'verified'])->name('events.index');
Route::get('/events/{id}', [\App\Http\Controllers\Web\EventController::class, 'edit'])->middleware(['auth', 'verified'])->name('events-form');
Route::patch('/events/{id}', [\App\Http\Controllers\Web\EventController::class, 'update'])->middleware(['auth', 'verified'])->name('events.update');
Route::post('/events', [\App\Http\Controllers\Web\EventController::class, 'store'])->middleware(['auth', 'verified'])->name('events.store');
Route::delete('/events/{id}', [\App\Http\Controllers\Web\EventController::class, 'destroy'])->middleware(['auth', 'verified'])->name('events.destroy');


//companies
Route::get('/companies', [\App\Http\Controllers\Web\CompanyController::class, 'index'])->middleware(['auth', 'verified'])->name('company.index');
Route::get('/companies/add', [\App\Http\Controllers\Web\CompanyController::class, 'create'])->middleware(['auth', 'verified'])->name('company.create');
Route::post('/companies/add', [\App\Http\Controllers\Web\CompanyController::class, 'store'])->middleware(['auth', 'verified'])->name('company.store');
Route::delete('/companies/{id}', [\App\Http\Controllers\Web\CompanyController::class, 'destroy'])->middleware(['auth', 'verified'])->name('company.destroy');

//artists
Route::get('/artists', [\App\Http\Controllers\Web\ArtistController::class, 'index'])->middleware(['auth', 'verified'])->name('artist.index');
Route::get('/artists/add', [\App\Http\Controllers\Web\ArtistController::class, 'create'])->middleware(['auth', 'verified'])->name('artist.create');
Route::post('/artists/add', [\App\Http\Controllers\Web\ArtistController::class, 'store'])->middleware(['auth', 'verified'])->name('artist.store');
Route::delete('/artists/{id}', [\App\Http\Controllers\Web\ArtistController::class, 'destroy'])->middleware(['auth', 'verified'])->name('artist.destroy');
Route::get('/artists/{id}', [\App\Http\Controllers\Web\ArtistController::class, 'edit'])->middleware(['auth', 'verified'])->name('artist.edit');


//places
Route::get('/places', [\App\Http\Controllers\Web\PlaceController::class, 'index'])->middleware(['auth', 'verified'])->name('place.index');
Route::get('/places/add', [\App\Http\Controllers\Web\PlaceController::class, 'create'])->middleware(['auth', 'verified'])->name('place.create');
Route::post('/places/add', [\App\Http\Controllers\Web\PlaceController::class, 'store'])->middleware(['auth', 'verified'])->name('place.store');
Route::delete('/places/{id}', [\App\Http\Controllers\Web\PlaceController::class, 'destroy'])->middleware(['auth', 'verified'])->name('place.destroy');


Route::middleware('auth')->group(function () {
    Route::get('/admin', [\App\Http\Controllers\Web\Admin\HomeController::class, 'index'])->name('admin');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/list-event', [\App\Http\Controllers\Web\EventController::class, 'showAllEvents'])->name('list-event');


require __DIR__.'/auth.php';
