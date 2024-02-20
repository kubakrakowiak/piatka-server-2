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
    ){
        $company = \App\Models\Company::factory()->create([
            'name' => $name,
            'image_url' => $imageUrl,
        ]);
    }

    public function getAllCompanies()
    {
        return \App\Models\Company::all();
    }

    public function updateCompany(mixed $validated, string $id)
    {
        $company = \App\Models\Company::find($id);
        $company->update($validated);
    }

    public function deleteCompany(string $companyId)
    {
        $company = \App\Models\Company::find($companyId);
        $company->delete();
    }
}
