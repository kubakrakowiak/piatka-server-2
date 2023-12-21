<?php

namespace Database\Seeders;

use App\Models\Artist;
use App\Models\Company;
use App\Models\Event;
use App\Models\EventType;
use App\Models\Image;
use App\Models\Place;
use App\Services\EventService;
use App\Services\EventServiceInterface;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{

    private EventServiceInterface $eventService;

    public function __construct(EventServiceInterface $eventService)
    {
        $this->eventService = $eventService;
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->eventService->createEvent(
            Company::where('name', 'B90')->first()->id,
            EventType::where('name', 'Party')->first()->id,
            'Test event',
            Carbon::now(),
            Carbon::now(),
            Place::where('alias', 'Elektrykow')->first()->id,
            Image::where('path', 'example.jpg')->first()->id,
            [Artist::where('name', 'Travis Scott')->first()->id],
            18
        );
    }
}
