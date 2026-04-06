<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'sale_id',
        'order_id',
        'invoice_number',
        'invoice_date',
    ];
    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }
}