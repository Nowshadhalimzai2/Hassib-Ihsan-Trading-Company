<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;




Route::middleware('auth')->prefix('admin')->group(function () {


    Route::get('/dashboard', [EmployeeController::class,  'dashboard'])->name('admin.dashboard');
    Route::get('transactions', [EmployeeController::class, 'transactions'])->name('admin.transactions');
    Route::post('store-transaction', [EmployeeController::class, 'storeTransaction'])->name('transaction.post');
    Route::get('transactions/{transaction}', [EmployeeController::class, 'showTransaction'])->name('admin.transaction.show');


    // ======================= REGISTER USER ROUTES =========================
    Route::get('/register-user', [RegisteredUserController::class, 'create'])->name('admin.register-user');

    // ----------------------- CUSTOMER RELATED ROUTES ------------------------
    Route::get('/all-customers', [RegisteredUserController::class, 'allCustomers'])->name('admin.all-customers');
    Route::get('/customers/{customer}', [RegisteredUserController::class, 'showCustomer'])->name('admin.customers.show');
    Route::delete('/customers/{customer}', [RegisteredUserController::class, 'deleteCustomer'])->name('admin.customers.delete');

    // ----------------------- EMPLOYEE RELATED ROUTES ------------------------
    Route::get('/all-employees', [RegisteredUserController::class, 'allEmployees'])->name('admin.all-employees');
    Route::get('/all-investors', [RegisteredUserController::class, 'allInvestors'])->name('admin.all-investors');
    Route::get('/all-tellers', [RegisteredUserController::class, 'allTellers'])->name('admin.all-tellers');
    Route::get('/all-vendors', [RegisteredUserController::class, 'allVendors'])->name('admin.all-vendors');

    // ======================= ORDERS ROUTES =========================
    Route::get('/orders', fn() => "hello");
});
