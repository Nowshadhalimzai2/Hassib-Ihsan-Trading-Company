<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;
use App\Models\Product;
use Inertia\Inertia;

Route::middleware('auth')->prefix('admin')->group(function () {


    Route::get('/dashboard', [EmployeeController::class,  'dashboard'])->name('admin.dashboard');

    // ----------------------- TRANSACTIONS RELATED ROUTES -----------------------------
    Route::resource('transactions', TransactionController::class);


    // ======================= REGISTER USER ROUTES =========================
    Route::get('/register-user', [RegisteredUserController::class, 'create'])->name('admin.register-user');

    // ----------------------- CUSTOMER RELATED ROUTES ------------------------
    Route::get('/all-customers', [RegisteredUserController::class, 'allCustomers'])->name('admin.all-customers');
    Route::get('/customers/{customer}', [RegisteredUserController::class, 'showCustomer'])->name('admin.customer.show');
    Route::delete('/customers/{customer}', [RegisteredUserController::class, 'deleteCustomer'])->name('admin.customer.delete');

    // ----------------------- EMPLOYEE RELATED ROUTES ------------------------
    Route::get('/all-employees', [RegisteredUserController::class, 'allEmployees'])->name('admin.all-employees');
    Route::get('/employees/{employee}', [RegisteredUserController::class, 'showEmployee'])->name('admin.employee.show');
    Route::delete('/employees/{employee}', [RegisteredUserController::class, 'deleteEmployee'])->name('admin.employee.delete');

    // ----------------------- Investor Related ROUTES ------------------------
    Route::get('/all-investors', [RegisteredUserController::class, 'allInvestors'])->name('admin.all-investors');
    Route::get('/investors/{investor}', [RegisteredUserController::class, 'showInvestor'])->name('admin.investor.show');
    Route::delete('/investors/{investor}', [RegisteredUserController::class, 'deleteInvestor'])->name('admin.investor.delete');

    // ----------------------- TELLERS Related ROUTES ------------------------
    Route::get('/all-tellers', [RegisteredUserController::class, 'allTellers'])->name('admin.all-tellers');
    Route::get('/tellers/{teller}', [RegisteredUserController::class, 'showTeller'])->name('admin.teller.show');
    Route::delete('/tellers/{teller}', [RegisteredUserController::class, 'deleteTeller'])->name('admin.teller.delete');

    // ----------------------- VENDORS Related ROUTES ------------------------
    Route::get('/all-vendors', [RegisteredUserController::class, 'allVendors'])->name('admin.all-vendors');
    Route::get('/vendors/{vendor}', [RegisteredUserController::class, 'showVendor'])->name('admin.vendor.show');
    Route::delete('/vendors/{vendor}', [RegisteredUserController::class, 'deleteVendor'])->name('admin.vendor.delete');


    // ======================= PRODUCTS RELATED ROUTES =========================

    Route::resource('products', ProductController::class);

    // ======================= ORDERS ROUTES =========================
    Route::get('/orders', fn() => "hello");
});
