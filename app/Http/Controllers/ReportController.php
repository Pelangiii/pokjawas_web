<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Laporan;

class ReportController extends Controller
{
    /**
     * Halaman verifikasi laporan admin
     */
    public function verifikasi()
    {
        $laporans = Laporan::with('user')
            ->latest()
            ->get();

        return Inertia::render('VerifikasiLaporan', [
            'laporans' => $laporans
        ]);
    }

    /**
     * Detail laporan
     */
    public function show($id)
    {
        $laporan = Laporan::with('user')
            ->findOrFail($id);

        return Inertia::render('DetailLaporan', [
            'laporan' => $laporan,
            'user' => Auth::user()
        ]);
    }

    /**
     * Update status laporan
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,diterima,ditolak',
        ]);

        $laporan = Laporan::findOrFail($id);

        $laporan->update([
            'status' => $request->status,
        ]);

        // FIX: Tembak langsung ke rute nama index-nya agar aman dari error 405
        return redirect()->route('verifikasi.index')->with(
            'message',
            'Status laporan berhasil diperbarui!'
        );
    }
}