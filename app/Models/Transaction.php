<?php

namespace App\Models;

use App\Models\Users\Role;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    protected $fillable = [
        'dealing_entity_id',
        'amount',
        'notes',
        'source_id',
        'destination_id',
    ];



    public function dealingEntity()
    {
        return $this->belongsTo(DealingEntity::class);
    }
    public function source()
    {
        return $this->belongsTo(User::class, 'source_id');
    }
    public function destination()
    {
        return $this->belongsTo(User::class, 'destination_id');
    }
    public function businessAccount()
    {
        return $this->belongsTo(BusinessAccount::class);
    }
    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }
}
