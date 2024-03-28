<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\EventTypeServiceInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;


class EventTypeController extends Controller
{

    private EventTypeServiceInterface $eventTypeService;

    public function __construct(EventTypeServiceInterface $eventTypeService)
    {
        $this->eventTypeService = $eventTypeService;
    }



    public function index()
    {
        return Inertia::render('Admin/EventTypes', [
            'eventTypes' => $this->eventTypeService->getAllEventTypes()
        ]);
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
    public function store(Request $request)
    {
        //
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
