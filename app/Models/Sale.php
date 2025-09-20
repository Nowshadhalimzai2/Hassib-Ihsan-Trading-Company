<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = [
        'currency_id',
        'total_amount',
        'date',
        'delivery_address',
    ];
    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }
    public function invoice()
    {
        return $this->hasOne(Invoice::class);
    }
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
