<?php

namespace Database\Seeders;

use App\Models\Image;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Company::factory()->create([
            'name' => 'B90',
            'image_id' => Image::where('path', 'example.jpg')->first(),
        ]);
    }
}
