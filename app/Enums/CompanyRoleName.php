<?php

namespace App\Enums;

enum CompanyRoleName: string
{
    case SuperAdmin = 'super-admin';
    case Admin = 'admin';
    case Moderator = 'moderator';

    public static function values(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }

}
