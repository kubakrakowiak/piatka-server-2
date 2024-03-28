<?php

namespace App\Services;

use App\Models\Artist;
use App\Models\User;

interface UserServiceInterface
{
    public function getAllUsers();

    public function getAuthenticatedUser();

    public function getUserById(string $userId): User;

    public function attachCompanyRole(string $userId, string $companyId, string $role): User;
    public function getUserCompanyPermission($userId, $companyId);
}
