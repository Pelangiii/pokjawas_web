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
    // 🔥 LIST LAPORAN USER
    public function index()
    {
        $laporans = Laporan::with('user')
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('User/Laporan/Index', [
            'laporans' => $laporans
        ]);
    }

    // 🔥 HALAMAN CREATE
    public function create()
    {
        return Inertia::render('User/Laporan/Create');
    }

    // 🔥 STORE (SUPPORT DRAFT)
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable', // draft boleh kosong
            'description' => 'nullable',
            'image' => 'nullable|image|max:2048',
            'status' => 'nullable|string'
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('laporan', 'public');
        }

        Laporan::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imagePath,
            'status' => $request->status ?? 'draft', // default draft
            'feedback' => null
        ]);

        return redirect('/user/laporan');
    }

    // 🔥 DETAIL LAPORAN
    public function show($id)
    {
        $laporan = Laporan::with('user')->findOrFail($id);

        return Inertia::render('User/Laporan/Show', [
            'laporan' => $laporan
        ]);
    }

    // 🔥 EDIT PAGE
    public function edit($id)
    {
        $laporan = Laporan::findOrFail($id);

        return Inertia::render('User/Laporan/Edit', [
            'laporan' => $laporan
        ]);
    }

    // 🔥 UPDATE (EDIT + HANDLE REVISI)
    public function update(Request $request, $id)
    {
        $laporan = Laporan::findOrFail($id);

        $request->validate([
            'title' => 'nullable',
            'description' => 'nullable',
            'image' => 'nullable|image|max:2048',
            'status' => 'nullable|string'
        ]);

        // 🔥 HANDLE IMAGE
        if ($request->hasFile('image')) {

            if ($laporan->image) {
                Storage::disk('public')->delete($laporan->image);
            }

            $laporan->image = $request->file('image')->store('laporan', 'public');
        }

        // 🔥 LOGIC STATUS
        $newStatus = $request->status ?? $laporan->status;

        // kalau sebelumnya revisi → balik ke proses
        if ($laporan->status === 'revisi') {
            $newStatus = 'proses';
        }

        $laporan->update([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $newStatus,
            'feedback' => null // reset feedback setelah user edit
        ]);

        return redirect('/user/laporan');
    }

    // 🔥 DELETE
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