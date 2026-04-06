<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;

Route::middleware('auth')->prefix('admin')->group(function () {

    Route::get('/dashboard', [EmployeeController::class,  'dashboard'])->name('admin.dashboard');

    // ----------------------- TRANSACTIONS RELATED ROUTES -----------------------------
    Route::resource('transactions', TransactionController::class);


    // ======================= REGISTER USER ROUTES =========================
    Route::get('/register-user', [RegisteredUserController::class, 'create'])->name('admin.register-user');

    // ----------------------- CUSTOMER RELATED ROUTES ------------------------
    Route::get('/customers', [CustomerController::class, 'index'])->name('admin.customers.index');
    Route::get('/customers/{customer}', [CustomerController::class, 'show'])->name('admin.customer.show');
    Route::delete('/customers/{customer}', [CustomerController::class, 'delete'])->name('admin.customer.delete');
    Route::get('/customers/{customer}/orders/{order}', [CustomerController::class, 'order'])->name('admin.customer.order');
    // ----------------------- EMPLOYEE RELATED ROUTES ------------------------
    Route::get('/employees', [RegisteredUserController::class, 'allEmployees'])->name('admin.employees.index');
    Route::get('/employees/{employee}', [RegisteredUserController::class, 'showEmployee'])->name('admin.employee.show');
    Route::delete('/employees/{employee}', [RegisteredUserController::class, 'deleteEmployee'])->name('admin.employee.delete');

    // ----------------------- Investor Related ROUTES ------------------------
    Route::get('/investors', [RegisteredUserController::class, 'allInvestors'])->name('admin.investors.index');
    Route::get('/investors/{investor}', [RegisteredUserController::class, 'showInvestor'])->name('admin.investor.show');
    Route::delete('/investors/{investor}', [RegisteredUserController::class, 'deleteInvestor'])->name('admin.investor.delete');

    // ----------------------- TELLERS Related ROUTES ------------------------
    Route::get('/tellers', [RegisteredUserController::class, 'allTellers'])->name('admin.tellers.index');
    Route::get('/tellers/{teller}', [RegisteredUserController::class, 'showTeller'])->name('admin.teller.show');
    Route::delete('/tellers/{teller}', [RegisteredUserController::class, 'deleteTeller'])->name('admin.teller.delete');

    // ----------------------- VENDORS Related ROUTES ------------------------
    Route::get('/vendors', [RegisteredUserController::class, 'allVendors'])->name('admin.vendors.index');
    Route::get('/vendors/{vendor}', [RegisteredUserController::class, 'showVendor'])->name('admin.vendor.show');
    Route::delete('/vendors/{vendor}', [RegisteredUserController::class, 'deleteVendor'])->name('admin.vendor.delete');


    // ======================= PRODUCTS RELATED ROUTES =========================

    Route::resource('products', ProductController::class);

    // ======================= ORDERS ROUTES =========================
    Route::get('/orders',[OrderController::class, 'index'])->name('admin.orders.index');
    Route::get('/orders/{order}/items',[OrderController::class, 'show'])->name('admin.orders.show');
    Route::patch('/orders/{order}/confirm/{status}', [OrderController::class, 'confirm'])->name('order.confirm');
    Route::patch('/orders/{order}/delivery/{time}', [OrderController::class, 'delivery'])->name('order.delivery.time');
    Route::delete('/items/{item}',[OrderController::class, 'destroyItem'])->name('items.destory');

    // ======================= Invoce Routes ============================
    Route::post('/invoice',[InvoiceController::class,'store'])->name('invoices.store');
    Route::get('/invoice/{order}',[InvoiceController::class,'show'])->name('invoices.show');
    
    // ======================= Employee Payments Routes =========================
    
});