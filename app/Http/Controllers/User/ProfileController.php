<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User; // 🔥 penting biar IDE ga error

class ProfileController extends Controller
{
    public function index()
    {
        return Inertia::render('User/Profile/Index', [
            'user' => Auth::user()
        ]);
    }

    public function edit()
    {
        return Inertia::render('User/Profile/Edit', [
            'user' => Auth::user()
        ]);
    }

    public function update(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();

        $request->validate([
            'name' => 'required',
            'avatar' => 'nullable|image|max:2048'
        ]);

        // ✅ upload foto kalau ada
        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('profile', 'public');
            $user->avatar = $path;
        }

        // ✅ update data
        $user->update([
            'name' => $request->name
        ]);

        return redirect('/user/profile');
    }
}