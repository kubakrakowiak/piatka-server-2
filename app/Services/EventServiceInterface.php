<?php

namespace App\Services;

use App\Models\Event;
use App\Models\User;

interface EventServiceInterface
{
    public function createEvent(
        string $companyId,
        string $eventTypeId,
        string $name,
        string $startingAt,
        string $endingAt,
        string $placeId,
        array $artists = [],
        ?int $ageRestriction = null
    ): Event;

    public function getAllEvents();

    public function updateEvent(mixed $validated, string $id): Event;

    public function deleteEvent(string $eventId);

    public function getEventById(string $eventId): Event;
}
