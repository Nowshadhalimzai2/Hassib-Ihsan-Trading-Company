<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    function create()
    {
        return Inertia::reneder('Contact');
    }
    function store(Request $request)
    {
        $data=$request->validate([
            'name' => 'string|min:3|max:25|required',
            'email' => 'email|required',
            'phone' => 'string|nullable',
            'message' => 'string|required|min:10|max:500',
            'post_id' => 'integer|nullable',
        ]);
        Contact::create($data);
        return redirect()->back()->with('success', 'Your message has been sent successfully!');
    }
}