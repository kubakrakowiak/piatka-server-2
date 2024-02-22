<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArtistRequest;
use App\Http\Requests\UpdateArtistRequest;
use App\Models\Artist;
use App\Services\ArtistServiceInterface;

class ArtistController extends Controller
{
    private ArtistServiceInterface $artistService;

    public function __construct(ArtistServiceInterface $artistService)
    {
        $this->artistService = $artistService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->artistService->getAllArtists();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArtistRequest $request)
    {
        return response()->json([
            'message' => 'Artist created successfully',
            'result' => $this->artistService->createArtist($request->validated())
            ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Artist $artist)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Artist $artist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArtistRequest $request, string $artistId)
    {
        return response()->json([
            'message' => 'Artist updated successfully',
            'result' => $this->artistService->updateArtist($request->validated(), $artistId)
            ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $artistId)
    {
        $this->artistService->deleteArtist($artistId);
        return response()->json([
            'message' => 'Artist deleted successfully',
            ], 200);
    }
}
