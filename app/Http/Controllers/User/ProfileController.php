<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;

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
            'phone' => 'nullable',
            'nip' => 'nullable',
            'address' => 'nullable',
            'birth_date' => 'nullable|date',
            'avatar' => 'nullable|image|max:2048'
        ]);

        // upload avatar
        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('profile', 'public');
            $user->avatar = $path;
        }

        // update data
        $user->update([
            'name' => $request->name,
            'phone' => $request->phone,
            'nip' => $request->nip,
            'address' => $request->address,
            'birth_date' => $request->birth_date
        ]);

        // 🔥 KIRIM FLASH MESSAGE
        return redirect('/user/dashboard')->with('success', 'Profile berhasil diupdate!');
    }
}