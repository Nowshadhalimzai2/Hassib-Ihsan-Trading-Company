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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->nullable()->constrained()->noActionOnDelete();
            $table->string('customer_name')->nullable();
            $table->foreignIdFor(Currency::class)->notNullable()->constrained()->cascadeOnDelete();
            $table->dateTime('sale_date')->notNullable();
            $table->string('delivery_address')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
