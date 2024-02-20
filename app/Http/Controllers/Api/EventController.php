<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use App\Services\EventServiceInterface;

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
        $this->eventService->createEvent($request->validated());

        return response()->json([
            'message' => 'Event created successfully',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $event)
    {
        $event = Event::with('artists')->findOrFail($event);
        return $event;
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
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        //
    }
}
