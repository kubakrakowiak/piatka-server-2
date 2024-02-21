<?php

namespace App\Services;

use App\Models\EventType;
use App\Models\User;

interface EventTypeServiceInterface
{
    public function createEventType(
        mixed $validated,
    ): EventType;

    public function getAllEventTypes();

    public function updateEventType(mixed $validated, string $id): EventType;

    public function deleteEventType(string $eventTypeId);

    public function getEventTypeById(string $eventTypeId): EventType;
}
