<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->prefix('customer')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('customer/Dashboard');
    })->name("customer.dashboard");
    Route::get('/orders', fn() => "hello orders")->name('orders');
    Route::get('/payments', fn() => "hello payments")->name('payments');
});
