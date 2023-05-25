<?php

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
        Schema::create('image_place', function (Blueprint $table) {
            $table->uuid('image_id');
            $table->foreign('image_id')
                ->references('id')
                ->on('images')
                ->onDelete('restrict');

            $table->uuid('place_id');
            $table->foreign('place_id')
                ->references('id')
                ->on('places')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('image_place');
    }
};
