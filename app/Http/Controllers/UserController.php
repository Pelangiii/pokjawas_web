<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index(Request $request)
{
    $query = User::query();

    if ($request->search) {
        $query->where('name', 'like', $request->search . '%');
    }

    if ($request->filter === 'az') {
        $query->orderBy('name', 'asc');
    } elseif ($request->filter === 'oldest') {
        $query->orderBy('created_at', 'asc');
    } else {
        $query->orderBy('created_at', 'desc');
    }

    return Inertia::render('ManagementUser', [
        'users' => $query->get(),
        'filters' => $request->only(['search', 'filter'])
    ]);
}

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|min:6',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $photoPath = $request->hasFile('photo') ? $request->file('photo')->store('profile-photos', 'public') : null;

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'nip' => $request->nip,
            'phone' => $request->phone,
            'birth_date' => $request->birth_date,
            'address' => $request->address,
            'photo' => $photoPath,
        ]);

        return redirect('/users');
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$id,
        ]);

        $data = $request->only(['name', 'email', 'nip', 'phone', 'address', 'birth_date']);

        if ($request->hasFile('photo')) {
            if ($user->photo) Storage::disk('public')->delete($user->photo);
            $data['photo'] = $request->file('photo')->store('profile-photos', 'public');
        }

        if ($request->password) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);
        return redirect('/users');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        if ($user->photo) Storage::disk('public')->delete($user->photo);
        $user->delete();
        return redirect()->back();
    }
}