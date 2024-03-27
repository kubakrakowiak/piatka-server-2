<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\Artist\StoreArtistRequest;
use App\Http\Requests\Artist\UpdateArtistRequest;
use App\Services\ArtistServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;


class ArtistController extends Controller
{

    private ArtistServiceInterface $artistService;

    public function __construct(ArtistServiceInterface $artistController)
    {
        $this->artistService = $artistController;
    }


    public function index(Request $request): Response
    {
        return Inertia::render('Admin/Artists', [
            'artists' => $this->artistService->getAllArtists()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('AddArtistDashboard');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArtistRequest $request): RedirectResponse
    {
        $request->validated();


        $this->artistService->createArtist(
            $request['name'],
            $request['imageId']
        );

        return Redirect::route('artist.index');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Admin/Update/EditPlaceHolder', [
            'artist' => $this->artistService->getArtistById($request['id'])
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArtistRequest $request, string $id) : RedirectResponse
    {

        $this->artistService->updateArtist(
            $request->validated(),
            $id,
        );


        return Redirect::route('artist.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $this->artistService->deleteArtist($request['id']);
        return Redirect::route('artist.index');
    }
}
