<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\Event\StoreEventRequest;
use App\Http\Requests\Event\UpdateEventRequest;
use App\Services\ArtistServiceInterface;
use App\Services\CompanyServiceInterface;
use App\Services\EventServiceInterface;
use App\Services\EventTypeServiceInterface;
use App\Services\PlaceServiceInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{


    private EventServiceInterface $eventService;
    private EventTypeServiceInterface $eventTypeService;
    private ArtistServiceInterface $artistService;
    private CompanyServiceInterface $companyService;
    private PlaceServiceInterface $placeService;


    public function __construct(PlaceServiceInterface $placeService, EventServiceInterface $eventService, EventTypeServiceInterface $eventTypeService, ArtistServiceInterface $artistService, CompanyServiceInterface $companyService)
    {
        $this->eventService = $eventService;
        $this->eventTypeService = $eventTypeService;
        $this->artistService = $artistService;
        $this->companyService = $companyService;
        $this->placeService = $placeService;
    }

    public function index(Request $request): Response
    {
        return Inertia::render('Events', [
            'events' => $this->eventService->getAllEvents()
        ]);
    }

    public function create(Request $request): Response
    {
        $eventType = $this->eventTypeService->getAllEventTypes();
        $artistsCollection = $this->artistService->getAllArtists();
        $companiesCollection = $this->companyService->getAllCompanies();
        $placesCollection = $this->placeService->getAllPlaces();

        return Inertia::render('AddEventDashboard', [
            'eventTypes' => $eventType,
            'artistsCollection' => $artistsCollection,
            'companiesCollection' => $companiesCollection,
            'placesCollection' => $placesCollection
        ]);
    }

    public function edit(Request $request): Response
    {
//        dd($request['id']);

        $eventType = $this->eventTypeService->getAllEventTypes();
        $artistsCollection = $this->artistService->getAllArtists();
        $companiesCollection = $this->companyService->getAllCompanies();

        return Inertia::render('EventsForm', [
            'eventTypes' => $eventType,
            'artistsCollection' => $artistsCollection,
            'companiesCollection' => $companiesCollection,
            'event' => $this->eventService->getEventById($request['id'])
        ]);
    }


    public function store(StoreEventRequest $request): RedirectResponse
    {
//        dd($request);
        $request->validated();
        $this->eventService->createEvent(
            $request['companyId'],
            $request['eventTypeId'],
            $request['name'],
            $request['startingAt'],
            $request['endingAt'],
            $request['placeId'],
            $request['artists'],
            18);

        return Redirect::route('events.index');
    }

    public function update(UpdateEventRequest $request): RedirectResponse
    {
        dd($request->validated());

        return Redirect::route('profile.edit');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $this->eventService->deleteEvent($request['id']);
        return Redirect::route('events.index');
    }

//    public function showAllEvents(){
//        $events = Event::all();
//        return  Inertia::render("Events", ['events' => $events]);
//    }

//    public function showAllEvents(): Response
//    {
//        $events = Event::all();
//        return Inertia::render('Events', ['events' => $events]);
//    }

}
