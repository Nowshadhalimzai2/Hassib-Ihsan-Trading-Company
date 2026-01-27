<?php

namespace App\Http\Controllers;

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
}
