<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BusinessAccount extends Model
{
    protected $fillable = [
        'name',
        'currency_id',
        'total_amount',

    ];
    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
