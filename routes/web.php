<?php

use App\Http\Controllers\Comment\CommentController;
use App\Http\Controllers\Post\PostController;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use phpDocumentor\Reflection\Types\Nullable;

Route::get('/', function () {
    // sleep(2);

    return Inertia::render('Home/Home');
})->name('home');
Route::get("/about", function () {
    return Inertia::render("About");
});
Route::get("/contact", function () {
    return Inertia::render("Contact");
})->name('contact');

//Route::view('/about', 'About')->name('about');

// -------------PRODUCTS GROUPED ROUTES --------------------
// Route::prefix('products')->group(function () {
//     Route::get('/', function () {

//         return Inertia::render("Products/Index");
//     })->name('products.index');
//     Route::post('/search', function () {
//         $searchTerm = request('query');
//         $products = Products::all()->filter(function ($product) use ($searchTerm) {
//             return str_contains(strtolower($product['name']), strtolower($searchTerm));
//         });
//         return Inertia::render('Products/List', ['products' => $products, 'query' => $searchTerm]);
//     })->name('products.search');
//     Route::get('/productlist', function () {
//         $products = Products::all();
//         return Inertia::render('Products/List', ['products' => $products]);
//     });

//     Route::get('/{product}', function ($product) {
//         $product = Products::all()[$product];
//         return Inertia::render('Products/Order', ['product' => $product]);
//     })->where('product', '[0-9]+')->name('products.show');

//     Route::get('/categories', function () {
//         $categories = collect(['Electronics', 'Books', 'Clothing', 'Home & Kitchen']);
//         return Inertia::render('Products/Categories', ['categories' => $categories]);
//     })->name('products.categories');
//     Route::get('/categories/{category}', function ($category) {
//         $products = collect(range(1, 10))->map(function ($id) use ($category) {
//             return [
//                 'id' => $id,
//                 'name' => $category . ' Product ' . $id,
//                 'price' => rand(10, 100) . '.00',
//                 'description' => 'This is the description for ' . $category . ' product ' . $id,
//             ];
//         });
//         return Inertia::render('Products/Category', ['category' => $category, 'products' => $products]);
//     })->name('products.category');
// });
// -------------END PRODUCTS GROUPED ROUTES --------------------


// -------------Blog GROUPED ROUTES --------------------
Route::prefix('blog')->group(function () {
    Route::get('/', [PostController::class, 'index'])->name('blog.index');
    Route::post('/blog', [PostController::class, 'store'])->name('blog.store');
    Route::put('/{id}', [PostController::class, 'update'])->name('blog.update');
    Route::get('/edit/{id}', [PostController::class, 'edit'])->name('blog.edit');
    Route::delete('/{id}', [PostController::class, 'destroy'])->name("blog.delete");
    Route::post('/comment', [CommentController::class, 'store'])->name('comment.post');

    Route::post('/posts/{id}/{isLiked}', [CommentController::class, 'storeLike'])->name('like.post');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        //return authenticated user
        // $transactions = Transaction::with('dealingEntity')->get();
        // $role = Auth::user()->role->name;


        $user = User::with(['role:name,id', 'transactionsAsSource', 'transactionsAsDestination'])->findOrFail(Auth::id());


        $currencies = Transaction::selectRaw('currencies.name, SUM(CASE 
		WHEN transactions.source_id=?
         THEN transactions.amount
		ELSE -transactions.amount
		END) as total', [Auth::id()])->join('currencies', 'transactions.currency_id', '=', 'currencies.id')
            ->where(function ($q) {
                $q->where('source_id', Auth::id())->orWhere('destination_id', Auth::id());
            })->groupBy('currencies.name')
            ->pluck('total', 'name');


        if ($user->role->name == "investor") {
            return Inertia::render(['dashboard', ['user' => $user], 'sumByCurrency' => $currencies]);
        } else if ($user->role->name == "customer") {
            $user = User::with(['role:name,id'])->findOrFail(Auth::id());
            return Inertia::render("customer/dashboard", ['user' => $user, 'sumByCurrency' => $currencies]);
        } else if ($user->role->name == "teller") {

            return Inertia::render("teller/dashboard", ['user' => $user, 'sumByCurrency' => $currencies]);
        } else if ($user->role->name == "vendor") {
            $products_sold_by_vendor = DB::table('products')
                ->where('user_id', $user->id)
                ->select('*')
                ->get();

            return Inertia::render("vendor/dashboard", ['user' => $user, 'sumByCurrency' => $currencies, 'products' => $products_sold_by_vendor]);
        } else if ($user->role->name == "employee") {



            return Inertia::render('admin/Dashboard', ['user' => $user]);
        } else {
            return "No role assigned";
        }
    })->name('dashboard');
});

Route::inertia('/services', 'Service')->name('service');


// 3333333333333333333333333333333333333333333333333333333333
Route::get('/test-email', function () {
    $details = [
        'title' => 'Test Email',
        'body' => 'This is a test email sent from Laravel application.',
    ];
    Mail::to('recipient@example.com')->queue(new \App\Mail\TestEmail($details));
    return 'Email sent successfully!';
});



// -------------INVESTOR ROUTES --------------------
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/investor_transactions', function () {
        $user = User::with(['role:name,id', 'transactionsAsSource', 'transactionsAsDestination'])->findOrFail(Auth::id());
        return Inertia::render('Investor/InvestorTransaction', ['user' => $user]);
    })->name('investor.InvestorTransaction');
});
// Route::inertia('/investors/annual-reports', 'Investors/AnnualReports')->name('investors.annual-reports');
// Route::inertia('/investors/financials', 'Investors/Financials')->name('investors.financials');
// Route::inertia('/investors/corporate-governance', 'Investors/CorporateGovernance')->name('investors.corporate-governance');
// Route::inertia('/investors/stock-information', 'Investors/StockInformation')->name('investors.stock-information');
// Route::inertia('/investors/news-and-events', 'Investors/NewsAndEvents')->name('investors.news-and-events');
// -------------END INVESTOR ROUTES --------------------

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/customer_routes.php';
require __DIR__ . '/investor_routes.php';
require __DIR__ . '/teller_routes.php';
require __DIR__ . '/employee_routes.php';
