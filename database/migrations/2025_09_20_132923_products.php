<?php

use App\Models\Category;
use App\Models\Currency;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->nullable()->constrained()->onDelete('no action');
            $table->string('name')->notNullable();
            $table->text('description')->nullable();
            $table->integer('quantity_in_stock')->default(0);
            $table->decimal('unit_price', 10, 2)->notNullable();
            $table->foreignIdFor(Currency::class)->notNullable()->constrained()->onDelete('no action');
            $table->foreignIdFor(Category::class)->nullable()->constrained()->onDelete('no action');
            $table->boolean('is_featured')->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
