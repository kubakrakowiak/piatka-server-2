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

class EventTypeService implements EventTypeServiceInterface
{
    public function createEventType(mixed $validated): EventType
    {
        $eventType = EventType::factory()->create($validated);

        return $eventType;
    }

    public function getAllEventTypes()
    {
        return EventType::all();
    }

    public function updateEventType(mixed $validated, string $id): EventType
    {
        $eventType = EventType::findOrFail($id);

        $eventType->update($validated);

        return $eventType;
    }

    public function deleteEventType(string $eventTypeId)
    {
        $eventType = EventType::findOrFail($eventTypeId);
        $eventType->delete();
    }

    public function getEventTypeById(string $eventTypeId): EventType
    {
        return EventType::findOrFail($eventTypeId);
    }
}
