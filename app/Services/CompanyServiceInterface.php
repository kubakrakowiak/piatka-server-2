<?php

namespace App\Services;

use App\Models\Company;
use App\Models\User;

interface CompanyServiceInterface
{
    public function createCompany(
        string $name,
    ): Company;

    public function getAllCompanies();

    public function updateCompany(mixed $validated, string $id): Company;

    public function deleteCompany(string $companyId);

    public function getCompanyById(string $companyId): Company;
}
