<?php

namespace App\Services;

use App\Models\Artist;
use App\Models\Company;
use App\Models\EventType;
use App\Models\Image;
use App\Models\Place;
use App\Models\User;
use Carbon\Carbon;

class UserService implements UserServiceInterface
{
    public function getAllUsers(): \Illuminate\Database\Eloquent\Collection
    {
        return User::all();
    }

    public function getUserById(string $userId): User
    {
        return User::findOrFail($userId);
    }
}
