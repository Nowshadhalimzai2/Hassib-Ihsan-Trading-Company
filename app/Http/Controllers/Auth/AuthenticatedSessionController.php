<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $user = User::where("email", $request->email)->with("role:name,id")->first();
        $request->authenticate();
        $request->session()->regenerate();

        if ($user && $user->role && $user->role->name == "customer") {
            return redirect()->intended(route('customer.dashboard', absolute: false));
        } else if ($user && $user->role && $user->role->name == "Investor") {
            return redirect()->intended(route('investor.dashboard', absolute: false));
        } else if ($user && $user->role && $user->role->name == "teller") {
            return redirect()->intended(route('teller.dashboard', absolute: false));
        } else if ($user && $user->role && $user->role->name == "employee") {
            return redirect()->intended(route('admin.Dashboard', absolute: false));
        } else if ($user && $user->role && $user->role->name == "vendor") {
            return redirect()->intended(route('vendor.dashboard', absolute: false));
        }
        return redirect()->intended(route('login', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
