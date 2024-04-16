<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\EventTypeServiceInterface;
use Illuminate\Http\Request;
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
    public function store(Request $request)
    {
        //
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
