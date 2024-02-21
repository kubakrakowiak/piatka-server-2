<?php

namespace App\Services;

use App\Models\Artist;
use App\Models\Company;
use App\Models\EventType;
use App\Models\Image;
use App\Models\Place;
use App\Models\User;
use Carbon\Carbon;

class ArtistService implements ArtistServiceInterface
{
    public function createArtist(mixed $validated): Artist
    {
        $artist = Artist::factory()->create($validated);

        return $artist;
    }

    public function getAllArtists()
    {
        return Artist::all();
    }

    public function updateArtist(mixed $validated, string $id): Artist
    {
        $artist = Artist::findOrFail($id);

        $artist->update($validated);

        return $artist;
    }

    public function deleteArtist(string $companyId)
    {
        $artist = Artist::findOrFail($companyId);
        $artist->delete();
    }

    public function getArtistById(string $artistId): Artist
    {
        return Artist::findOrFail($artistId);
    }
}
