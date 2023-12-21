<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property mixed $user_id
 * @property mixed $event_id
 */
class Participation extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'event_id'];
}
