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
        Schema::table('payments', function (Blueprint $table) {
            // $table->dropForeign(['user_id']);
            // $table->dropColumn('user_id');

            // $table->dropForeign(['invoice_id']);
            // $table->dropColumn('invoice_id');
            
            // $table->dropForeign(['payment_method_id']);
            // $table->dropColumn('payment_method_id');

            $table->foreignIdFor(User::class)->notNullable()->default(1)->constrained()->noActionOnDelete();
            $table->foreignIdFor(Invoice::class)->notNullable()->default(1)->constrained()->noActionOnDelete();
            $table->foreignIdFor(PaymentMethod::class)->notNullable()->default(1)->constrained()->noActionOnDelete();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');

            $table->dropForeign(['invoice_id']);
            $table->dropColumn('invoice_id');
            
            $table->dropForeign(['payment_method_id']);
            $table->dropColumn('payment_method_id');
            $table->foreignIdFor(User::class)->nullable()->constrained()->noActionOnDelete();
            $table->foreignIdFor(Invoice::class)->nullable()->constrained()->noActionOnDelete();
            $table->foreignIdFor(PaymentMethod::class)->nullable()->constrained()->nullOnDelete();
        });
    }
};