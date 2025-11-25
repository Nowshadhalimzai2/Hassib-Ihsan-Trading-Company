<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Models\Post\Comment;
use App\Models\Post\Like;
use App\Models\Post\Post;
use App\Models\Users\Role;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'phone',
        'address',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    function transactionsAsSource()
    {
        return $this->hasMany(Transaction::class, 'source_id');
    }

    function transactionsAsDestination()
    {
        return $this->hasMany(Transaction::class, 'destination_id');
    }
    function role()
    {
        return $this->belongsTo(Role::class);
    }
    function orders()
    {
        return $this->hasMany(Order::class);
    }

    function invoices()
    {
        return $this->hasMany(Invoice::class);
    }
    function sales()
    {
        return $this->hasMany(Sale::class);
    }
    function payments()
    {
        return $this->hasMany(Payment::class);
    }

    function products()
    {
        return $this->hasMany(Product::class);
    }
    function posts()
    {
        return $this->hasMany(Post::class);
    }

    function likes()
    {
        return $this->hasMany(Like::class);
    }
    function likedPosts()
    {
        return $this->belongsToMany(Post::class, 'likes');
    }
    function comments()
    {
        return $this->hasMany(Comment::class);
    }
    function totalLikes()
    {
        return $this->hasManyThrough(Like::class, Post::class)->count();
    }
}
