<?php

namespace App\Http\Controllers\Web;


use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreCompanyRequest;
use App\Services\CompanyServiceInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    private CompanyServiceInterface $companyService;


    public function __construct(CompanyServiceInterface $companyService)
    {
        $this->companyService = $companyService;
    }

    public function index(Request $request): Response
    {
        return Inertia::render('Admin/Companies', [
            'companies' => $this->companyService->getAllCompanies()
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('AddComapnyDashboard');
    }

    public function store(StoreCompanyRequest $request): RedirectResponse
    {
        $request->validated();
        $this->companyService->createCompany(
            $request->name,
            $request->imageUrl
        );


        return Redirect::route('company.index');
    }
    public function destroy(string $id): RedirectResponse
    {
        $this->companyService->deleteCompany($id);
        return Redirect::route('company.index');
    }


}
