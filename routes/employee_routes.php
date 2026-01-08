<?php

use App\Http\Controllers\EmployeeController;
use App\Models\Transaction;
use Illuminate\Support\Facades\Route;




Route::middleware('auth')->prefix('admin')->group(function () {


    Route::get('/dashboard', [EmployeeController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/register-user', [EmployeeController::class, 'registerUser'])->name('admin.register-user');
    Route::get('transactions', [EmployeeController::class, 'transactions'])->name('admin.transactions');
    Route::post('store-transaction', [EmployeeController::class, 'storeTransaction'])->name('transaction.post');
    Route::get('transactions/{transaction}', [EmployeeController::class, 'showTransaction'])->name('admin.transaction.show');

    // ======================= ORDERS ROUTES =========================
    Route::get('/orders', fn() => "hello");
});
