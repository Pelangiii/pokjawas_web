<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Laporan;

class ReportController extends Controller
{
    /**
     * Menampilkan halaman list Verifikasi Laporan untuk Admin
     */
    public function verifikasi()
    {
        // Ambil semua data laporan dari database beserta user pembuatnya
        $laporans = Laporan::with('user')->latest()->get();

        // UBAH DI SINI: Hapus teks 'Admin/' karena filenya langsung di luar folder Pages
        return Inertia::render('VerifikasiLaporan', [
            'laporans' => $laporans
        ]);
    }

    /**
     * Menampilkan detail dari salah satu laporan
     */
    public function show($id)
    {
        // Cari laporan berdasarkan ID beserta user pembuatnya
        $laporan = Laporan::with('user')->findOrFail($id);

        // UBAH DI SINI JUGA: Jika nanti file DetailLaporan.jsx kamu juga ada di luar folder Admin
        return Inertia::render('DetailLaporan', [
            'laporan' => $laporan,
            'user' => Auth::user()
        ]);
    }

    /**
     * Fungsi untuk menerima, menolak, atau meminta revisi laporan
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:diterima,revisi,ditolak',
            'feedback' => 'nullable|string'
        ]);

        $laporan = Laporan::findOrFail($id);
        
        $laporan->update([
            'status' => $request->status,
            'feedback' => $request->feedback
        ]);

        return redirect()->back()->with('message', 'Status laporan berhasil diperbarui!');
    }
}