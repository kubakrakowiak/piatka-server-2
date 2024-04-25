<?php

namespace App\Http\Controllers\Web;


use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreCompanyRequest;
use App\Http\Requests\Company\UpdateCompanyRequest;
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
        return Inertia::render('Admin/Table', [
            'itemType' => 'company',
            'data' => $this->companyService->getAllCompanies()
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('AddItem', [
            "itemType" => "company"
        ]);
    }

    public function store(StoreCompanyRequest $request): RedirectResponse
    {

        $this->companyService->createCompany(
            $request['name']
        );


        return Redirect::route('company.index');
    }

    public function destroy(string $id): RedirectResponse
    {
        $this->companyService->deleteCompany($id);
        return Redirect::route('company.index');
    }

    public function edit(Request $request): Response
    {
        return Inertia::render('AddItem', [
            'itemType' => 'company',
            'editTarget' => $this->companyService->getCompanyById($request['id'])
        ]);
    }

    public function update(UpdateCompanyRequest $request, string $id): \Illuminate\Http\JsonResponse
    {
        $this->companyService->updateCompany(
            $request->validated(),
            $id
        );

        return response()->json(['message' => 'Item updated successfully'], 200);

    }


}
