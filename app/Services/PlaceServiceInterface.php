<?php

namespace App\Services;

use App\Models\Place;
use App\Models\User;

interface PlaceServiceInterface
{
    public function createPlace(
        string $alias,
        string $x_coord,
        string $y_coord
    ): Place;

    public function getAllPlaces();

    public function updatePlace(mixed $validated, string $id): Place;

    public function deletePlace(string $placeId);

    public function getPlaceById(string $placeId): Place;
}
