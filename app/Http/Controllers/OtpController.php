<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class OtpController extends Controller
{

    public function show(Request $request)
    {
        return Inertia::render("OTP", ['email' => $request->query('email')]);
    }

    public function verify(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string',
        ]);

        $cacheKey = 'otp_' . $data['email'];
        $cachedOtp = Cache::get($cacheKey);

        if (! $cachedOtp) {
            return redirect()->route('login')->with('error', 'OTP expired or not found');
        }

        if (! hash_equals((string) $cachedOtp, (string) $data['otp'])) {
            return back()->with('error', 'OTP is invalid')->withInput();
        }

        Cache::forget($cacheKey);

        $user = User::where('email', $data['email'])->first();
        if (! $user) {
            return redirect()->route('login')->with('error', 'User not found');
        }

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->route('admin.dashboard');
    }
}
