<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\EventType;
use App\Models\Image;
use App\Models\Place;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Event::factory()->create([
            'name' => 'Test event',
            'age_restriction' => 18,
            'starting_at' => Carbon::now(),
            'ending_at' => Carbon::now(),
            'event_type_id' => EventType::where('name', 'Party')->first(),
            'image_id' => Image::where('path', 'example.jpg')->first(),
            'place_id' => Place::where('alias', 'Elektrykow')->first(),
            'company_id' => Company::where('name', 'B90')->first(),
        ]);
    }
}
