<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Laporan;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use App\Mail\LaporanMasukMail;

class LaporanController extends Controller
{
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

    public function create()
    {
        return Inertia::render('User/Laporan/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'status' => 'nullable|string'
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('laporan', 'public');
        }

        $laporan = Laporan::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imagePath,
            'status' => $request->status ?? 'pending',
            'feedback' => null
        ]);

        Mail::to('admin@gmail.com')->send(new LaporanMasukMail($laporan));

        return redirect('/user/laporan');
    }

    public function show($id)
    {
        $laporan = Laporan::with('user')->findOrFail($id);

        if ($laporan->image) {
            $laporan->image = asset('storage/' . $laporan->image);
        }

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
            'title' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'status' => 'nullable|string'
        ]);

        if ($request->hasFile('image')) {
            if ($laporan->image) {
                Storage::disk('public')->delete($laporan->image);
            }
            $laporan->image = $request->file('image')->store('laporan', 'public');
        }

        $newStatus = $request->status ?? $laporan->status;

        if ($laporan->status === 'revisi') {
            $newStatus = 'proses';
        }

        $laporan->update([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $newStatus,
            'feedback' => null
        ]);

        return redirect('/user/laporan');
    }

    public function verifikasi()
    {
        $laporans = Laporan::with('user')
            ->latest()
            ->get()
            ->map(function ($laporan) {
                if ($laporan->image) {
                    $laporan->image = asset('storage/' . $laporan->image);
                }
                return $laporan;
            });

        return Inertia::render('Verifikasi/Index', [
            'laporans' => $laporans
        ]);
    }

    // FIX: Fungsi update status yang dipanggil oleh Admin dari React
    public function updateStatus(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:laporans,id',
            'status' => 'required|in:revisi,diterima',
        ]);

        $laporan = Laporan::findOrFail($request->id);
        $laporan->status = $request->status;
        $laporan->save(); // Memastikan status tersimpan ke database

        // Mental kembali ke halaman list verifikasi laporan
        return redirect('/admin/verifikasilaporan')->with('success', 'Status laporan berhasil diperbarui!');
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