<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Validate\ValidateTransaction;


class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $user = User::with(['role:name,id'])->findOrFail(Auth::id());
        $transactions = Transaction::orderBy('created_at', 'desc')->get();
        // dd($transactions);



        return Inertia::render("admin/Transaction/Index", ['user' => $user, 'transactions' => $transactions]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::with('role:id,name')->get(['id', 'name', 'role_id'])->groupBy('role.name');
        return Inertia::render("admin/Transaction/Create", ['users' => $users]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validate = new ValidateTransaction($request);

        $entities = $request->entities;
        if ($entities == "B2T" || $entities == "T2B") {
            $validate->B2T();
        } else if ($entities == "T2V" || $entities == "V2T")
            $validate->T2V();
        else if ($entities == "B2V" || $entities == "V2B")
            $validate->B2V();

        Transaction::create($request->all());

        return redirect()->route('transactions.index')->with('success', 'Transaction recorded successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        // dd($transaction);
        $transaction = Transaction::with(["source", 'destination'])->findOrFail($transaction->id);

        return Inertia::render("ShowTransaction", ['transaction' => $transaction]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        $users = User::with('role:id,name')->get(['id', 'name', 'role_id'])->groupBy('role.name');
        $transaction = Transaction::with('dealingEntity:id,name')->findOrFail($transaction->id);

        return Inertia::render("admin/Transaction/Edit", ['transaction' => $transaction, 'users' => $users]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'amount' => 'required|numeric',
            'currency_id' => 'required|exists:currencies,id',
            'source_id' => 'nullable|exists:dealing_entities,id',
            'destination_id' => 'nullable|exists:dealing_entities,id',
            'business_account_id' => 'required|exists:business_accounts,id',
            'description' => 'nullable|string',
        ]);
        $transaction = Transaction::findOrFail($id)->update($data);
        return redirect()->route('transactions.show', $transaction)->with('success', 'Transaction updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->destroy();

        return redirect()->route('transactions.index')->with('success', 'Transaction deleted successfully.');
    }
}
