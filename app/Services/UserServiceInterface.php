<?php

namespace App\Services;

use App\Models\Artist;
use App\Models\User;

interface UserServiceInterface
{
    public function getAllUsers();

    public function getUserById(string $userId): User;
}
