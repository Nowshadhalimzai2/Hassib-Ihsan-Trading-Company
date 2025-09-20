<?php

use App\Models\Users\Role;
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
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('role_id')->notNullable()->after('email')->default(Role::where('name', 'customer')->first()->id);
            $table->string('address')->notNullable()->after('profit_percentage')->default('Not Provided');
            $table->decimal('profit_percentage', 5, 2)->nullable()->after('salary');
            $table->decimal('salary', 8, 2)->nullable()->after('password');
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('no action')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['salary', 'profit_percentage', 'address']);
            $table->dropForeign(['role_id']);
            $table->dropColumn('role_id');
        });
    }
};
