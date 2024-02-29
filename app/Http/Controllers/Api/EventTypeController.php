<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EventType\StoreEventTypeRequest;
use App\Http\Requests\EventType\UpdateEventTypeRequest;
use App\Models\EventType;
use App\Services\EventTypeServiceInterface;

class EventTypeController extends Controller
{
    private EventTypeServiceInterface $eventTypeService;

    public function __construct(EventTypeServiceInterface $eventTypeService)
    {
        $this->eventTypeService = $eventTypeService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $eventTypes = $this->eventTypeService->getAllEventTypes();
        return $eventTypes;
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
    public function store(StoreEventTypeRequest $request)
    {
        $eventType = $this->eventTypeService->createEventType(
            $request->validated()
        );

        return response()->json([
            'message' => 'Event type created successfully',
            'result' => $eventType
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $eventTypeId)
    {
        $eventType = $this->eventTypeService->getEventTypeById($eventTypeId);
        return $eventType;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EventType $eventType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventTypeRequest $request, string $eventTypeId)
    {
        $request->validated();
        $eventType = $this->eventTypeService->updateEventType(
            $request->validated(),
            $eventTypeId
        );

        return response()->json([
            'message' => 'Event type updated successfully',
            'result' => $eventType
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $eventTypeId)
    {
        $this->eventTypeService->deleteEventType($eventTypeId);

        return response()->json([
            'message' => 'Event type deleted successfully',
        ], 200);
    }
}
