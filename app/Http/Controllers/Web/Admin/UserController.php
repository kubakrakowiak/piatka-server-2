<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use App\Services\UserServiceInterface;
use Illuminate\Http\RedirectResponse;
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
        return Inertia::render('Admin/Table', [
            'itemType' => 'user',
            'data' => $this->userService->getAllUsers()
        ]);
    }
    public function create()
    {
        return Inertia::render('AddItem', [
            'itemType' => 'user'
        ]);
    }



}
