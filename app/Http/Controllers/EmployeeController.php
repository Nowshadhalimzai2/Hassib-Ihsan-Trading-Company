<?php

namespace App\Http\Controllers;

use App\Models\DealingEntity;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Users\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    // ===================== FUNCTIONS ===================== //

    private function calculateBusinessAccountSubBasedONCurrency()
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

        return $total;
    }


    //          PUBLIC FUNCTIONS          //

    public function dashboard()
    {
        $user = User::with(['role:name,id', 'transactionsAsSource', 'transactionsAsDestination'])->findOrFail(Auth::id());

        $curs = $this->calculateBusinessAccountSubBasedONCurrency();

        return Inertia::render('admin/Dashboard', ['user' => $user, 'curs' => $curs]);
    }


    public function registerUser()
    {
        $roles = Role::all();
        $user = User::with(['role:name,id', 'transactionsAsSource', 'transactionsAsDestination'])->findOrFail(Auth::id());

        return Inertia::render('admin/RegisterUser', ['user' => $user, 'roles' => $roles]);
    }
    public function transactions()
    {
        $user = User::with(['role:name,id'])->findOrFail(Auth::id());
        $transactions = Transaction::orderBy('created_at', 'desc')->get();
        // dd($transactions);

        $users = User::with('role:id,name')->get(['id', 'name', 'role_id'])->groupBy('role.name');


        return Inertia::render("admin/Transactions", ['user' => $user, 'transactions' => $transactions, 'users' => $users]);
    }
    public function storeTransaction(Request $request)
    {
        dd($request->all());
        $request->validate([
            'amount' => 'required|numeric',
            'currency_id' => 'required|exists:currencies,id',
            'source_id' => 'nullable|exists:dealing_entities,id',
            'destination_id' => 'nullable|exists:dealing_entities,id',
            'business_account_id' => 'required|exists:business_accounts,id',
            'description' => 'nullable|string',
        ]);

        Transaction::create([
            'amount' => $request->amount,
            'currency_id' => $request->currency_id,
            'source_id' => $request->source_id,
            'destination_id' => $request->destination_id,
            'business_account_id' => $request->business_account_id,
            'description' => $request->description,
            'created_by' => Auth::id(),
        ]);

        return redirect()->route('admin.transactions')->with('success', 'Transaction recorded successfully.');
    }
    public function showTransaction(Transaction $transaction)
    {
        $transaction = Transaction::with(["source", 'destination'])->findOrFail($transaction->id);

        return Inertia::render("TransactionDetails", ['transaction' => $transaction]);
    }
}
