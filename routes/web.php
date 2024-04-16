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





Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// Events
Route::prefix('events')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/add', [\App\Http\Controllers\Web\EventController::class, 'create'])->name('event.create');
    Route::get('/', [\App\Http\Controllers\Web\EventController::class, 'index'])->name('event.index');
    Route::get('/{id}', [\App\Http\Controllers\Web\EventController::class, 'edit'])->name('event.edit');
    Route::patch('/{id}', [\App\Http\Controllers\Web\EventController::class, 'update'])->name('event.update');
    Route::post('/add', [\App\Http\Controllers\Web\EventController::class, 'store'])->name('event.store');
    Route::delete('/{id}', [\App\Http\Controllers\Web\EventController::class, 'destroy'])->name('event.destroy');
});

// Event-Types
Route::prefix('event-types')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [\App\Http\Controllers\Web\EventTypeController::class, 'index'])->name('event-type.index');
    Route::get('/add', [\App\Http\Controllers\Web\EventTypeController::class, 'create'])->name('event-type.create');
    Route::post('/add', [\App\Http\Controllers\Web\EventTypeController::class, 'store'])->name('event-type.store');
    Route::delete('/{id}', [\App\Http\Controllers\Web\EventTypeController::class, 'destroy'])->name('event-type.destroy');
    Route::get('/{id}', [\App\Http\Controllers\Web\EventTypeController::class, 'edit'])->name('event-type.edit');
    Route::patch('/{id}', [\App\Http\Controllers\Web\EventTypeController::class, 'update'])->name('event-type.update');
});



// Companies
Route::prefix('companies')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [\App\Http\Controllers\Web\CompanyController::class, 'index'])->name('company.index');
    Route::get('/add', [\App\Http\Controllers\Web\CompanyController::class, 'create'])->name('company.create');
    Route::post('/add', [\App\Http\Controllers\Web\CompanyController::class, 'store'])->name('company.store');
    Route::delete('/{id}', [\App\Http\Controllers\Web\CompanyController::class, 'destroy'])->name('company.destroy');
    Route::get('/{id}', [\App\Http\Controllers\Web\CompanyController::class, 'edit'])->name('company.edit');
    Route::patch('/{id}', [\App\Http\Controllers\Web\CompanyController::class, 'update'])->name('company.update');
});

// Artists
Route::prefix('artists')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [\App\Http\Controllers\Web\ArtistController::class, 'index'])->name('artist.index');
    Route::get('/add', [\App\Http\Controllers\Web\ArtistController::class, 'create'])->name('artist.create');
    Route::post('/add', [\App\Http\Controllers\Web\ArtistController::class, 'store'])->name('artist.store');
    Route::delete('/{id}', [\App\Http\Controllers\Web\ArtistController::class, 'destroy'])->name('artist.destroy');
    Route::get('/{id}', [\App\Http\Controllers\Web\ArtistController::class, 'edit'])->name('artist.edit');
    Route::patch('/{id}', [\App\Http\Controllers\Web\ArtistController::class, 'update'])->name('artist.update');
});

// Places
Route::prefix('places')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [\App\Http\Controllers\Web\PlaceController::class, 'index'])->name('place.index');
    Route::get('/add', [\App\Http\Controllers\Web\PlaceController::class, 'create'])->name('place.create');
    Route::post('/add', [\App\Http\Controllers\Web\PlaceController::class, 'store'])->name('place.store');
    Route::delete('/{id}', [\App\Http\Controllers\Web\PlaceController::class, 'destroy'])->name('place.destroy');
    Route::get('/{id}', [\App\Http\Controllers\Web\PlaceController::class, 'edit'])->name('place.edit');
    Route::patch('/{id}', [\App\Http\Controllers\Web\PlaceController::class, 'update'])->name('place.update');
});

// Users
Route::prefix('users')->middleware(['auth'])->group(function () {
    Route::get('/', [\App\Http\Controllers\Web\Admin\UserController::class, 'index'])->name('user.index');
    Route::get('/add', [\App\Http\Controllers\Web\Admin\UserController::class, 'create'])->name('user.create');
    Route::post('/add', [\App\Http\Controllers\Web\Admin\UserController::class, 'store'])->name('user.store');
    Route::delete('/{id}', [\App\Http\Controllers\Web\Admin\UserController::class, 'destroy'])->name('user.destroy');
    Route::get('/{id}', [\App\Http\Controllers\Web\Admin\UserController::class, 'edit'])->name('user.edit');
    Route::patch('/{id}', [\App\Http\Controllers\Web\Admin\UserController::class, 'update'])->name('user.update');

});


Route::middleware('auth')->group(function () {
    Route::get('/admin', [\App\Http\Controllers\Web\Admin\HomeController::class, 'index'])->name('admin');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::get('/list-event', [\App\Http\Controllers\Web\EventController::class, 'showAllEvents'])->name('list-event');


require __DIR__.'/auth.php';
