<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnknownCustomer extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'address',
    ];
    function orders()
    {
        return $this->hasMany(Order::class);
    }
}
