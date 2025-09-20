<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'unknown_customer_id',
        'currency_id',
        'order_date',
        'should_call',
        'delivery_address',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function unknownCustomer()
    {
        return $this->belongsTo(UnknownCustomer::class);
    }
    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
