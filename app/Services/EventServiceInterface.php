<?php

namespace App\Services;

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
        string $imageId,
        array $artists = [],
        ?int $ageRestriction = null
    );

    public function getAllEvents();

    public function updateEvent(mixed $validated, string $id);
}
