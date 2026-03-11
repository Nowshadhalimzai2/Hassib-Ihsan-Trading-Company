<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
use App\Models\Users\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Component\TotalAmountBA;

class EmployeeController extends Controller
{
    // ===================== FUNCTIONS ===================== //

    //          PUBLIC FUNCTIONS          //

    public function dashboard()
    {

        $total = new TotalAmountBA;

        $user = User::with(['role:name,id', 'transactionsAsSource', 'transactionsAsDestination'])->findOrFail(Auth::id());

        $curs = $total->BABadget();

        return Inertia::render('admin/Dashboard', ['user' => $user, 'curs' => $curs]);
    }


    public function registerUser()
    {
        $roles = Role::all();
        $user = User::with(['role:name,id', 'transactionsAsSource', 'transactionsAsDestination'])->findOrFail(Auth::id());

        return Inertia::render('admin/RegisterUser', ['user' => $user, 'roles' => $roles]);
    }
}
