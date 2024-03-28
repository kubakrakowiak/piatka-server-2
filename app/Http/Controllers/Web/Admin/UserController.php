<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use App\Services\UserServiceInterface;
use Inertia\Inertia;

class UserController extends Controller
{

    private UserServiceInterface $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        return Inertia::render('Admin/Users', [
            'users' => $this->userService->getAllUsers()
        ]);
    }

    public function showPermissions()
    {
        $user = $this->userService->getAuthenticatedUser();
        $user->load('companies', 'roles');
        return Inertia::render('Admin/UserPermissions', [
            'user' => $user,
            'systemRoles' => $user->roles,
            'companies' => $user->companies
        ]);
    }

}
