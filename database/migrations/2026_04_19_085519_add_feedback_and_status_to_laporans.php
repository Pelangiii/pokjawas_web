<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('laporans', function (Blueprint $table) {

            // 🔥 BIAR GA DOUBLE ERROR
            if (!Schema::hasColumn('laporans', 'status')) {
                $table->string('status')->default('draft');
            }

            if (!Schema::hasColumn('laporans', 'feedback')) {
                $table->text('feedback')->nullable();
            }

        });
    }

    public function down(): void
    {
        Schema::table('laporans', function (Blueprint $table) {

            if (Schema::hasColumn('laporans', 'status')) {
                $table->dropColumn('status');
            }

            if (Schema::hasColumn('laporans', 'feedback')) {
                $table->dropColumn('feedback');
            }

        });
    }
};