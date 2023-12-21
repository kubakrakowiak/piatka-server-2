<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreFavouriteRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class FavouriteController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        return $user->favourites;
    }

    public function store(StoreFavouriteRequest $request)
    {
        $user = Auth::user();

        // Sprawdzenie, czy użytkownik już dodał to wydarzenie do ulubionych
        if ($user->favourites->contains($request->event_id)) {
            return response()->json(['message' => 'This event is already in your favourites'], 409);
        }

        $user->favourites()->attach($request->event_id);
        return response()->json(['message' => 'Event added to favourites'], 201);
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $user->favourites()->detach($id);
        return response()->json(['message' => 'Event removed from favourites'], 200);
    }
}
