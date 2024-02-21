<?php

namespace App\Services;

use App\Models\Artist;
use App\Models\Company;
use App\Models\EventType;
use App\Models\Image;
use App\Models\Place;
use App\Models\User;
use Carbon\Carbon;

class CompanyService implements CompanyServiceInterface
{
    public function createCompany(
        string $name,
        string $imageUrl,
    ): Company{
        $company = Company::factory()->create([
            'name' => $name,
            'image_url' => $imageUrl,
        ]);
        return $company;
    }

    public function getAllCompanies()
    {
        return Company::all();
    }

    public function updateCompany(mixed $validated, string $id): Company
    {
        $company = Company::find($id);
        $company->update($validated);

        return $company;
    }

    public function deleteCompany(string $companyId)
    {
        $company = Company::find($companyId);
        $company->delete();
    }

    public function getCompanyById(string $companyId): Company
    {
        return Company::find($companyId);
    }
}
