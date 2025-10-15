<?php

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ====================  TELLLER ROUTES  ================================
Route::middleware(['auth', 'verified'])->prefix('teller')->name('teller.')->group(function () {
    Route::get('/details/{id}', function ($id) {

        $transaction = Transaction::findOrFail($id);

        return Inertia::render('teller/TransactionDetails', ['transaction' => $transaction]);
    })->name('teller.transactionDetails');
});
