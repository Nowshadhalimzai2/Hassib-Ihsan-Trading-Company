<?php

namespace App\Models\Users;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Role extends Model
{
    use HasFactory, Notifiable;
    protected $fillable = ['name'];
    public function users()
    {
        return $this->hasMany(\App\Models\User::class);
    }
}
