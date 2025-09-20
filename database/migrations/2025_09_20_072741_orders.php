<?php

use App\Models\Currency;
use App\Models\UnknownCustomer;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use PHPUnit\Framework\TestSize\Unknown;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->nullable()->constrained()->noActionOnDelete();
            $table->foreignIdFor(UnknownCustomer::class)->nullable()->constrained()->noActionOnDelete();
            $table->foreignIdFor(Currency::class)->notNullable()->constrained()->cascadeOnDelete();
            $table->dateTime('order_date')->notNullable();
            $table->boolean('should_call')->notNullable()->default(true);
            $table->string('delivery_address')->notNullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
