<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Place::factory()->create([
            'alias' => 'Elektrykow',
            'x_coord' => 1.21,
            'y_coord' => 1.91,
        ]);
    }
}
