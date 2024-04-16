<?php

namespace App\Http\Controllers\Web\Admin;

use App\Enums\CompanyRoleName;
use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreCompanyRequest;
use App\Http\Requests\CompanyPermission\StoreCompanyPermissionRequest;
use App\Http\Requests\GlobalPermission\StoreGlobalPermissionRequest;
use App\Models\Company;
use App\Models\User;
use App\Services\UserService;
use App\Services\UserServiceInterface;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

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
            'userSystemRoles' => $user->roles,
            'userCompanies' => $user->companies,
            'companyRoles' => CompanyRoleName::values(),
        ]);
    }

    /**
     * @throws \Exception
     */
    public function storePermissions(string $id, StoreGlobalPermissionRequest $globalPermissionRequest)
    {
        $this->userService->attachGlobalPermission($id, $globalPermissionRequest['roleId']);
        return response('', 200);
    }

    public function storeCompanyPermissions(string $id, StoreCompanyPermissionRequest $companyPermissionRequest): \Illuminate\Foundation\Application|\Illuminate\Http\Response|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory
    {
        if (in_array($companyPermissionRequest['roleId'], CompanyRoleName::values())) {
            return response('Invalid role', 400);
        }
        $this->userService->attachCompanyRole($id, $companyId, $companyPermissionRequest['roleId']);

        return response('', 200);
    }
}
