<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use App\Services\EventServiceInterface;
use Illuminate\Auth\Access\AuthorizationException;

class EventController extends Controller
{
    private EventServiceInterface $eventService;

    public function __construct(EventServiceInterface $eventService)
    {
        $this->eventService = $eventService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->eventService->getAllEvents();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        $request->validated();
        $event = $this->eventService->createEvent(
            $request['companyId'],
            $request['eventTypeId'],
            $request['name'],
            $request['startingAt'],
            $request['endingAt'],
            $request['placeId'],
            [],
            $request['ageRestriction'],
        );

        return response()->json([
            'message' => 'Event created successfully',
            'result' => $event
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $eventId)
    {
        $event = Event::with('artists')->findOrFail($eventId);
        return $event;
    }

    public function showAllEvents(){
        return Event::all();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateEventRequest  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateEventRequest $request, $id)
    {
        $event = $this->eventService->updateEvent($request->validated(), $id);

        return response()->json([
            'message' => 'Event updated successfully',
            'event' => $event], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $eventId)
    {
        $this->eventService->deleteEvent($eventId);
        return response()->json(['message' => 'Event deleted successfully'], 200);
    }
}
