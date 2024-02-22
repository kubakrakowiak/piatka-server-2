<?php

namespace App\Services;

use App\Models\Artist;
use App\Models\User;

interface ArtistServiceInterface
{
    public function createArtist(mixed $validated): Artist;

    public function getAllArtists();

    public function updateArtist(mixed $validated, string $id): Artist;

    public function deleteArtist(string $companyId);

    public function getArtistById(string $artistId): Artist;
}
