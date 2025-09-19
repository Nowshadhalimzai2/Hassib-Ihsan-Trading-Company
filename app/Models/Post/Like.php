<?php

namespace App\Models\Post;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Like extends Model
{
    function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
