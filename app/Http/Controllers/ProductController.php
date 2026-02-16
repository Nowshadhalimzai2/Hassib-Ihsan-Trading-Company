<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post\Post;
use App\Models\Product;
use App\Models\User;
use App\Models\Users\Role;
use GuzzleHttp\Handler\Proxy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Pest\Support\Arr;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        // the user is passed to the component so as to detect the component the role of the user
        $user = User::with('role')->find(Auth::id());
        $products = Product::with(['user'])->get();


        return Inertia::render("admin/Product/Index", ['products' => $products, 'user' => $user]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        // the user is passed to the component so as to detect the component the role of the user
        $user = User::with('role')->find(Auth::id());

        $vendors = User::where('role_id', 5)->get();
        $categories = Category::all(['id', 'name']);

        return Inertia::render("admin/Product/Create", ['user' => $user, 'vendors' => $vendors, 'categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => "required|min:2|string",
            'user_id' => "required|integer|exists:users,id",
            'unit_price' => "integer|required|min:1",
            'currency_id' => "required|integer|min:1|max:3",
            'quantity_in_stock' => "required|integer|min:1",
            'category_id' => "required|integer|min:1",
            'is_featured' => "required|boolean",

        ]);


        DB::beginTransaction();
        try {

            Product::create([
                'name' => $request->name,
                'user_id' => Auth::id(),
                'unit_price' => $request->unit_price,
                'quantity_in_stock' => $request->quantity_in_stock,
                'currency_id' => $request->currency_id,
                'category_id' => $request->category_id,
                'description' => $request->description,
                'is_featured' => $request->is_featured,
            ]);
            Post::create([
                'user_id' => Auth::id(),
                'content' => $request->description,
                'file_path' => 'https://picsum.photos/seed/130/480',
            ]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', "Error:" . $e->getMessage());
        }


        return redirect(route('products.index'))->with('success', 'Product added successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('admin/Product/Show', ['product' => Product::with(['user:id,name,componay', 'category:id,name'])->findOrFail($id)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render("admin/Product/Edit", ['product' => Product::with(['user:id,name,componay', 'category:id,name'])->findOrFail($id)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        dd($id);
    }
}
