<?php

namespace App\Services;

use App\Models\User;

class EventService implements EventServiceInterface
{
    public function createEvent(
        User   $user,
        string $companyId,
        string $eventTypeId,
        string $name,
        string $startingAt,
        string $locationLng,
        string $locationLat,
        float  $ticketPrice,
        ?int   $ageRestriction = null
    ){
        return 1;
    }

}
