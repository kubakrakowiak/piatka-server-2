<?php

namespace App\Services;

use App\Models\User;

interface CompanyServiceInterface
{
    public function createCompany(
        string $name,
        string $imageUrl,
    );

    public function getAllCompanies();
}
