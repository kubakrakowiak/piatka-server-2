<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\EventType\StoreEventTypeRequest;
use App\Http\Requests\EventType\UpdateEventTypeRequest;
use App\Services\EventTypeServiceInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;


class EventTypeController extends Controller
{

    private EventTypeServiceInterface $eventTypeService;

    public function __construct(EventTypeServiceInterface $eventTypeService)
    {
        $this->eventTypeService = $eventTypeService;
    }



    public function index()
    {
        return Inertia::render('Admin/Table', [
            'itemType' => 'event-type',
            'data' => $this->eventTypeService->getAllEventTypes()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('AddItem' , [
            'itemType' => 'event-type'
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventTypeRequest $request) : RedirectResponse
    {

        $this->eventTypeService->createEventType(
            $request->validated()
    );

        return Redirect::route('event-type.index');

    }

    /**0
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
        return Inertia::render('AddItem', [
            'itemType' => 'event-type',
            'editTarget' => $this->eventTypeService->getEventTypeById($request['id'])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventTypeRequest $request, string $id) : RedirectResponse
    {

        $this->eventTypeService->updateEventType(
            $request->validated(),
            $id,
        );

        return Redirect::route('event-type.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request) : RedirectResponse
    {
        $this->eventTypeService->deleteEventType($request['id']);

        return Redirect::route('event-type.index');
    }
}
