<?php

namespace App\Http\Controllers\Web;


use App\Http\Controllers\Controller;
use App\Services\CompanyServiceInterface;
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
        return Inertia::render('Companies', [
            'companies' => $this->companyService->getAllCompanies()
        ]);
    }


}
