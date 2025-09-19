<?php

use App\Http\Controllers\Comment\CommentController;
use App\Http\Controllers\Post\PostController;
use App\Models\Post\Post;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;

// class Products
// {
//     public static function all()
//     {
//         return collect(range(1, 100))->map(function ($id) {
//             return [
//                 'id' => $id,
//                 'name' => 'Product ' . $id,
//                 'price' => rand(10, 100) . '.00',
//                 'description' => 'This is the description for product ' . $id,
//             ];
//         });
//     }
// }

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
        return Inertia::render('dashboard');
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

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
