<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\Place\StorePlaceRequest;
use App\Http\Requests\Place\UpdatePlaceRequest;
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
        return Inertia::render('Admin/Table' , [
            'itemType' => 'place',
            'data' => $this->placeService->getAllPlaces()
        ]);
    }

    public function create(Request $request) : Response
    {
        return Inertia::render('AddItem', [
            'itemType' => 'place'
        ]);
    }

    public function store(StorePlaceRequest $request) : RedirectResponse
    {
        $request->validated();

        $this->placeService->createPlace(
            $request['alias'],
            $request['xCoord'],
            $request['yCoord']
        );

        return Redirect::route('place.index');
    }



    public function edit(Request $request): Response
    {
        return Inertia::render('AddItem', [
            'itemType' => 'place',
            'editTarget' => $this->placeService->getPlaceById($request->route('id'))
        ]);
    }

    public function destroy(string $id) : RedirectResponse
    {
        $this->placeService->deletePlace($id);
        return Redirect::route('place.index');
    }

    public function update(UpdatePlaceRequest $request, string $id) : \Illuminate\Http\JsonResponse
    {
        $request->validated();

        $this->placeService->updatePlace(
            $request->validated(),
            $id
        );

        return response()->json(['message' => 'Item updated successfully'], 200);

    }
}
