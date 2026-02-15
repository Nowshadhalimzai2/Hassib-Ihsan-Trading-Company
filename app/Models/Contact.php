<?php

namespace App\Models;

use App\Models\Post\Post;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = ['name', 'email', 'phone', 'message'];

    function post()
    {

        $this->belongsTo(Post::class);
    }
}
