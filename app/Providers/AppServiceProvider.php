<?php

namespace App\Providers;

use App\Services\ArtistService;
use App\Services\ArtistServiceInterface;
use App\Services\CompanyService;
use App\Services\CompanyServiceInterface;
use App\Services\EventService;
use App\Services\EventServiceInterface;
use App\Services\EventTypeService;
use App\Services\EventTypeServiceInterface;
use App\Services\PlaceService;
use App\Services\PlaceServiceInterface;
use App\Services\UserService;
use App\Services\UserServiceInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(EventServiceInterface::class, EventService::class);
        $this->app->bind(CompanyServiceInterface::class, CompanyService::class);
        $this->app->bind(ArtistServiceInterface::class, ArtistService::class);
        $this->app->bind(PlaceServiceInterface::class, PlaceService::class);
        $this->app->bind(EventTypeServiceInterface::class, EventTypeService::class);
        $this->app->bind(UserServiceInterface::class, UserService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
