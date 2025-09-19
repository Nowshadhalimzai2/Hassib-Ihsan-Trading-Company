<?php

namespace App\Http\Controllers\Comment;

use App\Http\Controllers\Controller;
use App\Models\Post\Comment;
use App\Models\Post\Like;
use App\Models\Post\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $data = $request->validate([
            'content' => 'required| max:250',
        ]);
        $comment = new Comment();
        $comment->content = $data['content'];
        $comment->user_id = Auth::user()->id;
        $comment->post_id = $request['id'];
        $comment->save();
        return redirect()->back()->with('message', 'comment added');
    }

    /**
     * Display the specified resource.
     */
    public function storeLike($id, $isLiked)
    {
        // Find the post by ID
        $post = Post::findOrFail($id);
        $isLiked = filter_var($isLiked, FILTER_VALIDATE_BOOLEAN);

        // Check if the user has already liked the post
        if ($isLiked) {
            $post->likes()->syncWithoutDetaching([Auth::id()]);
        } else {
            $post->likes()->detach(Auth::id());
        }

        return response()->json([
            'message' => 'Like status updated',
            'likes_count' => $post->likes()->count()
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}