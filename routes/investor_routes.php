<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->prefix('investor')->name('investor.')->group(function () {
    Route::get('/investor/dashboard', function () {
        return Inertia::render('Investor/Dashboard');
    })->name('dashboard');
});
