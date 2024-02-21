<?php

namespace App\Services;

use App\Models\Artist;
use App\Models\Company;
use App\Models\Event;
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
        array $artists = [],
        ?int $ageRestriction = null,
    ): Event
    {
        $event = Event::factory()->create([
            'name' => $name,
            'age_restriction' => $ageRestriction,
            'starting_at' => $startingAt,
            'ending_at' => $endingAt,
            'event_type_id' => $eventTypeId,
            'place_id' => $placeId,
            'company_id' => $companyId,
        ]);
        $event->artists()->attach($artists);
        return $event;
    }

    public function getAllEvents()
    {
        return Event::all();
    }

    public function updateEvent(mixed $validated, string $id): Event
    {
        $event = Event::findOrFail($id);

        $event->update($validated);

        return $event;
    }

    public function deleteEvent(string $eventId)
    {
        $event = Event::findOrFail($eventId);
        $event->delete();
    }

    public function getEventById(string $eventId): Event
    {
        return Event::findOrFail($eventId);
    }
}
