<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Models\Post\Like;
use App\Models\Post\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Eager load the 'likes' relationship
        $posts = Post::latest()->with('likes', 'comments', 'comments.user:id,name',)->withCount('comments', 'likes')->paginate(10);


        return Inertia::render('Blog/Index', ['posts' => $posts]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'content' => "required| max:512",
        ]);
        if ($request->hasFile('file')) {
            $request->validate([
                'file' => 'mimes:jpeg,png,jpg,gif,svg,mp4,webm,ogg|max:10240',
            ]);
        }
        $post = new Post();
        $post->user_id = 1;
        $post->content = $request->content;

        if ($request->hasFile('file')) {
            $imagePath = $request->file('file')->store('posts', 'public');
            $post->file_path = $imagePath;
        }

        $post->save();
        return redirect()->to('/blog')->with('message', "Post created successfully");
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $post)
    {
        return Inertia::render("Blog/Edit", ["pre_post" => Post::find($post)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'content' => 'required|max:512',
        ]);

        if ($request->hasFile('file')) {
            $request->validate([
                'file' => 'mimes:jpeg,png,jpg,gif,svg,mp4,webm,ogg|max:10240',
            ]);
        }

        $post = Post::findOrFail($id);
        $post->content = $request->content;

        if ($request->hasFile('file')) {
            $imagePath = $request->file('file')->store('posts', 'public');
            $post->file_path = $imagePath;
        }

        $post->save();
        return redirect(route('blog.index'))->with('message', "The Post updated succesfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Post::find($id)->delete();
        return redirect()->to(route('blog.index'))->with("message", "The post has been deleted successfully");
    }
}
