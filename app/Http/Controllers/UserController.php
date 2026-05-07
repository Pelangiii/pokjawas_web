<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(Request $request)
    {
        // LOGIKA BARU: Ambil yang rolenya 'pegawai' 
        // DAN pastikan ID-nya bukan ID admin yang sedang login (Double Protection)
        $query = User::where('role', 'pegawai')
                     ->where('id', '!=', Auth::id());

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', $request->search . '%')
                    ->orWhere('email', 'like', $request->search . '%');
            });
        }

        // Sorting Logic
        if ($request->filter === 'az') {
            $query->orderBy('name', 'asc');
        } elseif ($request->filter === 'za') {
            $query->orderBy('name', 'desc');
        } elseif ($request->filter === 'oldest') {
            $query->orderBy('created_at', 'asc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        return Inertia::render('Admin/ManagementUser', [
            // Kita pakai get() untuk mengambil datanya
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
            'role' => 'pegawai', // User yang ditambah manual selalu jadi pegawai
        ]);

        return redirect()->back(); // Redirect back lebih aman untuk Inertia
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
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
        return redirect()->back();
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        if ($id == Auth::id()) {
            return redirect()->back()->with('error', 'Anda tidak bisa menghapus akun sendiri.');
        }

        if ($user->photo) Storage::disk('public')->delete($user->photo);
        $user->delete();
        return redirect()->back();
    }
}