<?php

use App\Models\DealingEntity;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Users\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;



Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get('/register-user', function () {
        $user = User::with(['role:name,id', 'transactionsAsSource', 'transactionsAsDestination'])->findOrFail(Auth::id());
        $roles = Role::all();
        return Inertia::render('admin/RegisterUser', ['user' => $user, 'roles' => $roles]);
    })->name('admin.register-user');
    Route::get('/dashboard', function () {
        $user = User::with(['role:name,id', 'transactionsAsSource', 'transactionsAsDestination'])->findOrFail(Auth::id());

        $curs = calculateBusinessAccountSubBasedONCurrency();

        return Inertia::render('admin/Dashboard', ['user' => $user, 'curs' => $curs]);
    })->name('admin.dashboard');

    Route::get('transactions', function () {
        $user = User::with(['role:name,id'])->findOrFail(Auth::id());
        $transactions = Transaction::orderBy('created_at', 'desc')->get();
        // dd($transactions);
        $dealingEntities = DealingEntity::all(['id', 'name']);
        $users = User::all(['id', 'name']);

        return Inertia::render("admin/Transactions", ['user' => $user, 'transactions' => $transactions, 'dealingEntities' => $dealingEntities, 'users' => $users]);
    })->name('admin.transactions');
    Route::post('transaction', function (Request $request) {
        dd($request->all());
    })->name('transaction.post');
    Route::get('users/transaction-detail/{transaction}', function (Transaction $transaction) {
        $transaction = Transaction::with(["source", 'destination'])->findOrFail($transaction->id);
        // dd($transaction1);


        return Inertia::render("TransactionDetails", ['transaction' => $transaction]);
    });
});



// ===================== FUNCTIONS ===================== //

function calculateBusinessAccountSubBasedONCurrency()
{


    $total = Transaction::selectRaw('currencies.name, SUM(CASE
		WHEN transactions.source_id IS NULL
         THEN -transactions.amount
		ELSE transactions.amount
		END) as total',)->join('currencies', 'transactions.currency_id', '=', 'currencies.id')
        ->where(function ($q) {
            $q->where('business_account_id', 1);
        })->groupBy('currencies.name')
        ->pluck('total', 'name');
    // $total = Transaction::where('business_account_id', 1)
    //     ->select('currency', DB::raw("SUM(CASE WHEN source_id IS NULL THEN amount WHEN destination_id IS NULL THEN -amount ELSE 0 END) as total"))
    //     ->groupBy('currency')
    //     ->get()
    //     ->mapWithKeys(function ($row) {
    //         return [$row->currency => (float) $row->total];
    //     });

    return $total;
}
