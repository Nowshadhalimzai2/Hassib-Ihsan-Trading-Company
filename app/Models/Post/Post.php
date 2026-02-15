<?php

namespace App\Models\Post;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    use HasFactory;
    protected $guard = [];


    function user()
    {
        return $this->belongsTo(User::class);
    }
    function likes()
    {
        return $this->belongsToMany(User::class, 'likes');
    }

    function isLiked()
    {
        return $this->likes()->where('user_id', Auth::id())->exists();
    }

    function comments()
    {
        return $this->hasMany(Comment::class);
    }
    function getCommentCountAttribute()
    {
        return $this->comments()->count();
    }
    function contacts()
    {
        return $this->hasMany(Contact::class);
    }
}
