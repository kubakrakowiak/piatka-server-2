<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FavouriteController;
use App\Http\Controllers\Api\ParticipationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'loginUser']);

Route::prefix('company')->group(function () {
    Route::get('/', [\App\Http\Controllers\Api\CompanyController::class, 'index']);
    Route::post('/', [\App\Http\Controllers\Api\CompanyController::class, 'store']);
});

Route::prefix('events')->group(function () {
    Route::get('/', [\App\Http\Controllers\Api\EventController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\Api\EventController::class, 'show']);
    Route::put('/{id}', [\App\Http\Controllers\Api\EventController::class, 'update']);
    Route::post('/', [\App\Http\Controllers\Api\EventController::class, 'store']);
});

// Favourites Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('favourites')->group(function () {
        Route::get('/', [FavouriteController::class, 'index']);
        Route::post('/', [FavouriteController::class, 'store']);
        Route::delete('/{id}', [FavouriteController::class, 'destroy']);
    });
});

// Participation Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('participations')->group(function () {
        Route::get('/', [ParticipationController::class, 'index']);
        Route::post('/', [ParticipationController::class, 'store']);
        Route::delete('/{id}', [ParticipationController::class, 'destroy']);
    });
});
