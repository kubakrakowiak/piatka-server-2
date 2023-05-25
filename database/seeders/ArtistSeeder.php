<?php

namespace Database\Seeders;

use App\Models\Image;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArtistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Artist::factory()->create([
            'name' => 'Travis Scott',
            'image_id' => Image::where('path', 'example.jpg')->first(),
        ]);
    }
}
