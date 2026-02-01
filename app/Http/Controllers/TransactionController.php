<?php

namespace App\Http\Controllers;

use App\Models\DealingEntity;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Validate\ValidateTransaction;

// Next Task is to validate the transactions if any trnasction
//  need check amount rule.
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
        $entities = DealingEntity::all(['id', 'name']);

        $users = User::with('role:id,name')->get(['id', 'name', 'role_id'])->groupBy('role.name');
        return Inertia::render("admin/Transaction/Create", ['users' => $users, 'entities' => $entities]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validate = new ValidateTransaction($request);
        $transaction = new Transaction();
        $entity = $request->entities['name'];
        // dd($request->all());
        if ($entity == "B2T" || $entity == "T2B") {
            if (!$validate->B2T($transaction))
                return back()->with('error', 'please check the balance of Business Account and try again!!!');
        } else if ($entity == "T2V" || $entity == "V2T")
            $validate->T2V($transaction);
        else if ($entity == "B2V" || $entity == "V2B")
            if (!$validate->B2V($transaction))
                return back()->with('error', 'please check the balance of Business Account and try again!!!');

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
        $entities = DealingEntity::all(['id', 'name']);
        $users = User::with('role:id,name')->get(['id', 'name', 'role_id'])->groupBy('role.name');
        $transaction = Transaction::with('dealingEntity:id,name')->findOrFail($transaction->id);

        return Inertia::render("admin/Transaction/Edit", ['transaction' => $transaction, 'users' => $users, 'entities' => $entities]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validate = new ValidateTransaction($request);
        $transaction = Transaction::findOrFail($id);
        // dd($request->all());
        $entity = $request->entities['name'];
        if ($entity == "B2T" || $entity == "T2B") {
            $validate->B2T($transaction);
        } else if ($entity == "T2V" || $entity == "V2T")
            $validate->T2V($transaction);
        else if ($entity == "B2V" || $entity == "V2B")
            $validate->B2V($transaction);

        return redirect()->route('transactions.show', $transaction)->with('success', 'Transaction updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        $transaction = Transaction::findOrFail($id);
        if ($transaction->delete())
            return redirect()->route('transactions.index')->with('success', 'Transaction deleted successfully.');
        return back()->withInput()->with('error', "transaction could not be deleted");
    }
}
