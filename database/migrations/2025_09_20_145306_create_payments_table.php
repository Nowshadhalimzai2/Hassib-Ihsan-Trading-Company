<?php

use App\Models\Invoice;
use App\Models\PaymentMethod;
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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount', 10, 2)->notNullable();
            $table->string('notes')->notNullable();
            $table->date('payment_date')->notNullable();
            $table->foreignIdFor(Invoice::class)->nullable()->constrained()->nullOnDelete();
            $table->foreignIdFor(PaymentMethod::class)->nullable()->constrained()->noActionOnDelete();
            $table->foreignIdFor(User::class)->nullable()->constrained()->noActionOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
