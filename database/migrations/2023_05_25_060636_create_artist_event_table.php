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
        Schema::create('artist_event', function (Blueprint $table) {
            $table->uuid('artist_id');
            $table->foreign('artist_id')
                ->references('id')
                ->on('artists')
                ->onDelete('restrict');

            $table->uuid('event_id');
            $table->foreign('event_id')
                ->references('id')
                ->on('events')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artist_event');
    }
};
