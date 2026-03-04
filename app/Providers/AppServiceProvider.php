<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            "auth" => function () {
                return [
                    "user" => auth()->user->only("id"),
                    "isAdmin" => auth()->check && auth()->user->is_admin,
                ];
            },
            "flash" => function () {
                return [
                    "success" => session("success"),
                    "error" => session("error"),
                    "warning" => session("warning"),
                    "info" => session("info"),
                    "status" => session("status"),
                    "message" => session("message"),
                ];
            },
            "URL" => function () {
                return [
                    "previous" => URL::previous(),
                ];
            }
        ]);
    }
}
