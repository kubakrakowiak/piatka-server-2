<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Models\Company;
use App\Services\CompanyServiceInterface;
use App\Services\EventServiceInterface;

class CompanyController extends Controller
{
    private CompanyServiceInterface $companyService;

    public function __construct(CompanyServiceInterface $companyService)
    {
        $this->companyService = $companyService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->companyService->getAllCompanies();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCompanyRequest $request)
    {
        $company = $this->companyService->createCompany($request['name'], 'uri');
        return response()->json([
            'message' => 'Company created successfully',
            'result' => $company,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $companyId)
    {
        $company = Company::with('events')->findOrFail($companyId);
        return $company;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompanyRequest $request, string $companyId): \Illuminate\Http\JsonResponse
    {
        $company = $this->companyService->updateCompany($request->validated(), $companyId);
        return response()->json([
            'message' => 'Company updated successfully',
            'result' => $company,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $companyId)
    {
        $this->companyService->deleteCompany($companyId);
        return response()->json([
            'message' => 'Company deleted successfully',
        ], 200);
    }
}
