<?php

use App\Models\BusinessAccount;
use App\Models\DealingEntity;
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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(DealingEntity::class)->constrained()->noActionOnDelete();
            $table->decimal('amount', 15, 2)->notNullable();
            $table->string('notes')->notNullable();
            $table->foreignId('source_id')->nullable()->constrained('users')->noActionOnDelete();
            $table->foreignId('destination_id')->nullable()->constrained('users')->noActionOnDelete();
            $table->foreignIdFor(BusinessAccount::class)->nullable()->constrained()->noActionOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
