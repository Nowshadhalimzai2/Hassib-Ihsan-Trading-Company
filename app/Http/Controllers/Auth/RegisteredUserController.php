<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Users\Role;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{

    /**
     * Show the registration page for a specific user type.
     */

    public function create(): Response
    {
        $roles = Role::all();
        $user = User::with('role')->find(Auth::id());

        return Inertia::render('admin/RegisterUser', ['roles' => $roles, 'user' => $user]);
    }

    public function storeCustomer(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'company' => 'sometimes|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
        $role_id = Role::where('name', 'customer')->first()->id; // Assuming 'customer' is the name of the role for customers
        $user = User::create([
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'role_id' => $role_id, // Assuming '3' is the ID for the 'customer' role
            'password' => Hash::make($request->password),
        ]);
        $user->company = $request->company ?? null;
        $user->save();
        event(new Registered($user));


        return redirect()->back()->with('success', 'Customer registered successfully.');
    }

    public function storeEmployee(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'salary' => 'required|numeric',
        ]);
        $role_id = Role::where('name', 'employee')->first()->id; // Assuming 'customer' is the name of the role for customers
        $user = User::create([
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'role_id' => $role_id,
            'password' => Hash::make($request->password),
        ]);

        // Ensure salary is set even if it's not mass assignable in the User model
        $user->salary = $request->salary;
        $user->save();

        event(new Registered($user));


        return redirect()->back()->with('success', 'Employee registered successfully.');
    }

    public function storeInvestor(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'profit_percentage' => 'required|numeric|min:1|max:100',
        ]);
        $role_id = Role::where('name', 'investor')->first()->id; // Assuming 'Investor' is the name of the role for customers
        $user = User::create([
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'role_id' => $role_id,
            'password' => Hash::make($request->password),
        ]);
        $user->profit_percentage = $request->profit_percentage;
        $user->save();
        event(new Registered($user));


        return redirect()->back()->with('success', 'Investor registered successfully.');
    }

    public function storeTeller(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone' => 'required|string|max:15 |min:10',
            'address' => 'required|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'company' => 'required|string| max:255| min:10'
        ]);

        $role_id = Role::where('name', 'teller')->first()->id; // Assuming 'Teller' is the name of the role for customers
        $user = User::create([
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'role_id' => $role_id,

            'password' => Hash::make($request->password),
        ]);
        $user->company = $request->company;
        $user->save();
        event(new Registered($user));


        return redirect()->back()->with('success', $request->first_name . ' ' . $request->last_name . ' Teller registered successfully.');
    }

    public function storeVendor(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone' => 'required|string|max:15 |min:10',
            'address' => 'required|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'company' => 'required|string| max:255| min:10'
        ]);

        $role_id = Role::where('name', 'vendor')->first()->id; // Assuming 'Teller' is the name of the role for customers
        $user = User::create([
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'role_id' => $role_id,

            'password' => Hash::make($request->password),
        ]);
        $user->company = $request->company;
        $user->save();
        event(new Registered($user));


        return redirect()->back()->with('success', $request->first_name . ' ' . $request->last_name . ' Vendor registered successfully.');
    }



    // ======================= VIEW ALL USERS =========================
    public function allCustomers(): Response
    {
        $customers = User::with('role')
            ->whereHas('role', function ($query) {
                $query->where('name', 'customer');
            })
            ->get();

        return Inertia::render('customer/AllCustomers', ['customers' => $customers]);
    }
    public function showCustomer(User $customer): Response
    {
        // Load any related data if necessary
        // example: $customer->load('orders');
        return Inertia::render('customer/ShowCustomer', ['customer' => $customer]);
    }
    public function deleteCustomer(User $customer): RedirectResponse
    {
        $customer->delete();

        return redirect()->route('admin.all-customers')->with('success', 'Customer deleted successfully.');
    }
}
