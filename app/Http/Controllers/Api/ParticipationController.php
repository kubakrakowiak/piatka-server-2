<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreParticipationRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class ParticipationController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        return $user->participations;
    }

    public function store(StoreParticipationRequest $request)
    {
        $user = Auth::user();

        if ($user->participations->contains($request->event_id)) {
            return response()->json(['message' => 'You are already participating in this event'], 409);
        }

        $user->participations()->attach($request->event_id);
        return response()->json(['message' => 'Participation added'], 201);
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $user->participations()->detach($id);
        return response()->json(['message' => 'Participation removed'], 200);
    }
}
