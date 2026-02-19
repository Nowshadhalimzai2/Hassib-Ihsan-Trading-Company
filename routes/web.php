<?php

use App\Http\Controllers\Comment\CommentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\Post\PostController;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\Subscriber;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Client\Request as ClientRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;




Route::get('/', function () {
    // dd(Cache::get('otp_nawshadhalimzai@gmail.com'));
    $product = Product::with('images')->where('is_featured', true)->latest()->take(5)->get();
    return Inertia::render('Home/Home', ['products' => $product]);
})->name('home');
Route::get("/about", function () {
    return Inertia::render("About");
});
Route::get("/contact", function () {
    return Inertia::render("Contact");
})->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/contact-us/{post}/{message}', function ($post, $message) {

    return Inertia::render('Contact', ['post' => $post, 'comment' => $message]);
})->name('message_us');

Route::post('/subscribe', function (Request $request) {
    // dd($request->all());
    $data = $request->validate([
        'name' => 'string|min:3|max:25|required',
        'email' => 'email|required',
    ]);
    Subscriber::create($data);
    return back()->with('success', 'Subscribed! you will receive our regular updates');
})->name('subscribe');

// -------------PRODUCTS GROUPED ROUTES --------------------
Route::prefix('products')->group(function () {
    Route::get('/', function () {
        // $categories = Category::with(['products', 'products.images'])->get();
        $categories = Category::with('images')->take(6)->get();
        $products = Product::with('images')->get(['id', 'name', 'unit_price', 'created_at', 'description']);
        return Inertia::render("Products/Index", ['products' => $products, 'categories' => $categories]);
    })->name('products.index');

    Route::get('/productlist', function () {
        $products = Product::with('images')->get();
        return Inertia::render('Products/List', ['products' => $products]);
    });

    Route::get('/categories', function () {
        $categories = Category::with(['products', 'images'])->get();
        return Inertia::render('Products/Categories', ['categories' => $categories]);
    })->name('products.categories');
    Route::get('/{product}', function ($product) {

        $product = Product::with('images')->findOrFail($product);
        return Inertia::render('Products/Order', ['product' => $product]);
    })->name('product.show');

    Route::get('/categories/{category}', function ($category) {
        return Inertia::render('Products/Category', ['category' => Category::with(['products', 'products.images'])->findOrFail($category)]);
    })->name('products.category');
});
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



// 3333333333333333333333333333333333333333333333333333333333
Route::get('/test-email', function () {
    $details = [
        'title' => 'Test Email',
        'body' => 'This is a test email sent from Laravel application.',
    ];
    Mail::to('recipient@example.com')->queue(new \App\Mail\TestEmail($details));
    return 'Email sent successfully!';
});


Route::post('/otp-verify', [OtpController::class, 'verify'])->name('otp.post');
Route::get('/otp-show', [OtpController::class, 'show'])->name('otp.show');

// -------------INVESTOR ROUTES --------------------
// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('/investor_transactions', function () {
//         $user = User::with(['role:name,id', 'transactionsAsSource', 'transactionsAsDestination'])->findOrFail(Auth::id());
//         return Inertia::render('Investor/InvestorTransaction', ['user' => $user]);
//     })->name('investor.InvestorTransaction');
// });
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
