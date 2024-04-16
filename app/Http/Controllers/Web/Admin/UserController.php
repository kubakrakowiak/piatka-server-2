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

    public function storePermissions(string $id, StoreGlobalPermissionRequest $globalPermissionRequest)
    {
        $user = User::find($id);
        $role = Role::findById($globalPermissionRequest['roleId']]);


        $user->assignRole($role);
        return response('', 200);
    }

        public function storeCompanyPermissions(string $id, StoreCompanyPermissionRequest $companyPermissionRequest)
    {
        $user = User::find($id);
        $company = Company::find($companyId);

        if(!in_array($companyPermissionRequest['roleId'], CompanyRoleName::values())) {
            return response('Invalid role', 400);
        }

        $user->companies()->attach($company, ['role_name' => $companyPermissionRequest['roleId']]);

        return response('', 200);
    }
}
