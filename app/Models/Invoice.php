<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;
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
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}