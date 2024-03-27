<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\Place\StorePlaceRequest;
use App\Services\PlaceServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;


class PlaceController extends Controller

{

    private PlaceServiceInterface $placeService;

    public function __construct(PlaceServiceInterface $placeController)
    {
        $this->placeService = $placeController;
    }


    public function index(Request $request) : Response
    {
        return Inertia::render('Places' , [
            'places' => $this->placeService->getAllPlaces()
        ]);
    }

    public function create(Request $request) : Response
    {
        return Inertia::render('AddPlaceDashboard');
    }

    public function store(StorePlaceRequest $request) : RedirectResponse
    {
        $request->validated();

        $this->placeService->createPlace(
            $request['alias'],
            $request['x_coord'],
            $request['y_coord']
        );

        return Redirect::route('place.index');
    }

    public function destroy(string $id) : RedirectResponse
    {
        $this->placeService->deletePlace($id);
        return Redirect::route('place.index');
    }
}
