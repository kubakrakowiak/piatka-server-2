<?php

namespace App\Services;

use App\Models\Artist;
use App\Models\Company;
use App\Models\EventType;
use App\Models\Image;
use App\Models\Place;
use App\Models\User;
use Carbon\Carbon;

class EventService implements EventServiceInterface
{
    public function createEvent(
        string $companyId,
        string $eventTypeId,
        string $name,
        string $startingAt,
        string $endingAt,
        string $placeId,
        string $imageId,
        array $artists = [],
        ?int $ageRestriction = null,
    ){
        $event = \App\Models\Event::factory()->create([
            'name' => $name,
            'age_restriction' => $ageRestriction,
            'starting_at' => $startingAt,
            'ending_at' => $endingAt,
            'event_type_id' => $eventTypeId,
            'image_id' => $imageId,
            'place_id' => $placeId,
            'company_id' => $companyId,
        ]);
        $event->artists()->attach($artists);
    }

    public function getAllEvents()
    {
        return \App\Models\Event::all();
    }

}
