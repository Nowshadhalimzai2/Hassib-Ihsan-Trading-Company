<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = [
        'amount',
        'payment_method_id',
        'notes',
        'payment_date',
        'invoice_id',
        'user_id',
    ];
    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }
    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
       public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}