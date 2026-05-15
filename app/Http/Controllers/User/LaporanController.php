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

    // 🔥 STORE LAPORAN + EMAIL ADMIN
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'status' => 'nullable|string'
        ]);

        $imagePath = null;

        // 🔥 HANDLE IMAGE
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('laporan', 'public');
        }

        // 🔥 CREATE LAPORAN
        $laporan = Laporan::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imagePath,

            // default status
            'status' => $request->status ?? 'pending',

            // feedback awal kosong
            'feedback' => null
        ]);

        // 🔥 KIRIM EMAIL KE ADMIN
        Mail::to('admin@gmail.com')
            ->send(new LaporanMasukMail($laporan));

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

    // 🔥 UPDATE USER
    public function update(Request $request, $id)
    {
        $laporan = Laporan::findOrFail($id);

        $request->validate([
            'title' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'status' => 'nullable|string'
        ]);

        // 🔥 HANDLE IMAGE
        if ($request->hasFile('image')) {

            // hapus image lama
            if ($laporan->image) {
                Storage::disk('public')->delete($laporan->image);
            }

            // upload image baru
            $laporan->image = $request->file('image')->store('laporan', 'public');
        }

        // 🔥 STATUS LOGIC
        $newStatus = $request->status ?? $laporan->status;

        // kalau sebelumnya revisi
        if ($laporan->status === 'revisi') {
            $newStatus = 'proses';
        }

        $laporan->update([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $newStatus,

            // reset feedback setelah revisi
            'feedback' => null
        ]);

        return redirect('/user/laporan');
    }

    // 🔥 ADMIN UPDATE STATUS
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string',
            'feedback' => 'nullable|string'
        ]);

        $laporan = Laporan::findOrFail($id);

        $laporan->update([
            'status' => $request->status,
            'feedback' => $request->feedback,
        ]);

        return back();
    }

    // 🔥 DELETE LAPORAN
    public function destroy($id)
    {
        $laporan = Laporan::findOrFail($id);

        // hapus image
        if ($laporan->image) {
            Storage::disk('public')->delete($laporan->image);
        }

        $laporan->delete();

        return redirect('/user/laporan');
    }
};
