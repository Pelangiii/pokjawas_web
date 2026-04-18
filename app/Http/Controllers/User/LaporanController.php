<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Laporan;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class LaporanController extends Controller
{
    public function index()
    {
        $laporans = Laporan::where('user_id', Auth::id())
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('User/Laporan/Index', [
            'laporans' => $laporans
        ]);
    }

    public function create()
    {
        return Inertia::render('User/Laporan/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'image' => 'nullable|image|max:2048'
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('laporan', 'public');
        }

        Laporan::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imagePath
        ]);

        return redirect('/user/laporan');
    }

    // 🔥 FIX DI SINI (TAMBAH with('user'))
    public function show($id)
    {
        $laporan = Laporan::with('user')->findOrFail($id);

        return Inertia::render('User/Laporan/Show', [
            'laporan' => $laporan
        ]);
    }

    public function edit($id)
    {
        $laporan = Laporan::findOrFail($id);

        return Inertia::render('User/Laporan/Edit', [
            'laporan' => $laporan
        ]);
    }

    public function update(Request $request, $id)
    {
        $laporan = Laporan::findOrFail($id);

        $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {

            if ($laporan->image) {
                Storage::disk('public')->delete($laporan->image);
            }

            $imagePath = $request->file('image')->store('laporan', 'public');
            $laporan->image = $imagePath;
        }

        $laporan->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return redirect('/user/laporan');
    }

    public function destroy($id)
    {
        $laporan = Laporan::findOrFail($id);

        if ($laporan->image) {
            Storage::disk('public')->delete($laporan->image);
        }

        $laporan->delete();

        return redirect('/user/laporan');
    }
}