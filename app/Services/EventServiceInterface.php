<?php

namespace App\Services;

use App\Models\User;

interface EventServiceInterface
{
    public function createEvent(User $user, string $companyId, string $eventTypeId, string $name, string $startingAt, string $locationLng, string $locationLat, float $ticketPrice, ?int $ageRestriction = null);
}
