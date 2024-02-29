<?php
namespace App\Http\Controllers\Web;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Event;

class EventController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Event/Index', [
            'status' => session('status'),
        ]);
    }

//    public function showAllEvents(){
//        $events = Event::all();
//        return view('events', ['events' => $events]);
//    }

//    public function showAllEvents(): Response
//    {
//        $events = Event::all();
//        return Inertia::render('Events', ['events' => $events]);
//    }

}
