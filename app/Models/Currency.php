<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    protected $fillable = [
        'name',
    ];
    public function products()
    {
        return $this->hasMany(Product::class);
    }
    public function sales()
    {
        return $this->hasMany(Sale::class);
    }
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
