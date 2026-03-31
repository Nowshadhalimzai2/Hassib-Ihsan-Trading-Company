<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use App\Models\Users\Role;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function index(): Response
    {
        $customers = User::with('role')
            ->whereHas('role', function ($query) {
                $query->where('name', 'customer');
            })
            ->get();
        return Inertia::render('UserIndex', ['title' => "Customers", 'users' => $customers]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'company' => 'sometimes|string|max:255',
            'password' => ['required', 'confirmed', Password::default()],
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

    public function show(User $customer): Response
    {
        // Load any related data if necessary
        // If need to order_items properties, load the order_items
        $customer->load(['orders']);
        return Inertia::render('customer/ShowCustomer', ['customer' => $customer]);
    }

    public function order( User $customer, Order $order)
    {
      
        $order->load(['orderItems.product','orderItems.product.images']);
        return Inertia::render('customer/OrderItems', ['order' => $order,'customer'=>$customer]);
    }

    public function destroy(User $customer): RedirectResponse
    {
        $customer->delete();

        return redirect()->route('admin.all-customers')->with('success', 'Customer deleted successfully.');
    }
}