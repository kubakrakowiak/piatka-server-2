<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['name'];

    public function events(){
        return $this->hasMany(Event::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'company_user')
            ->withPivot('role_name')
            ->withTimestamps();
    }
}
