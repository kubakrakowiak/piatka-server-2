<?php

namespace App\Providers;

use App\Services\CompanyService;
use App\Services\CompanyServiceInterface;
use App\Services\EventService;
use App\Services\EventServiceInterface;
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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
