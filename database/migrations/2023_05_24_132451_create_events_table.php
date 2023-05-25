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
        Schema::create('events', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->integer('age_restriction')->unsigned();
            $table->dateTime('starting_at');
            $table->dateTime('ending_at');

            $table->uuid('image_id');
            $table->foreign('image_id')
                ->references('id')
                ->on('images')
                ->onDelete('restrict');

            $table->uuid('company_id');
            $table->foreign('company_id')
                ->references('id')
                ->on('companies')
                ->onDelete('restrict');

            $table->uuid('place_id');
            $table->foreign('place_id')
                ->references('id')
                ->on('places')
                ->onDelete('restrict');

            $table->uuid('event_type_id');
            $table->foreign('event_type_id')
                ->references('id')
                ->on('event_types')
                ->onDelete('restrict');

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
