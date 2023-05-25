<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         \App\Models\EventType::factory()->create([
             'id' => '27767159-872e-4947-95cf-614da93ec472',
             'name' => 'Party',
         ]);
         \App\Models\EventType::factory()->create([
             'id' => '23f3ba42-bdd4-436d-97e5-33a7577d2215',
             'name' => 'Festival',
         ]);
    }
}
