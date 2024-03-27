<?php

namespace App\Services;

use App\Models\Artist;
use App\Models\Company;
use App\Models\EventType;
use App\Models\Image;
use App\Models\Place;
use App\Models\User;
use Carbon\Carbon;

class PlaceService implements PlaceServiceInterface
{

    public function createPlace(string $alias, string $x_coord, string $y_coord): Place
    {
        $place = Place::factory()->create([
            'alias' => $alias,
            'x_coord' => $x_coord,
            'y_coord' => $y_coord,
        ]);

        return $place;
    }

    public function getAllPlaces()
    {
        return Place::all();
    }

    public function updatePlace(mixed $validated, string $id): Place
    {
        $place = Place::findOrFail($id);

        $place->update($validated);

        return $place;
    }

    public function deletePlace(string $placeId)
    {
        $place = Place::findOrFail($placeId);
        $place->delete();
    }

    public function getPlaceById(string $placeId): Place
    {
        return Place::findOrFail($placeId);
    }
}
