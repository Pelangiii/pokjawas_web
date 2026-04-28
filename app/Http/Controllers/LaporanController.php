<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
// use App\Models\Laporan; // Buka ini kalau nanti udah bikin Model Laporan

class LaporanController extends Controller
{
    /**
     * Menampilkan halaman Verifikasi Laporan
     */
    public function index()
    {
        // Sementara pakai data dummy dulu biar lu bisa liat hasilnya di React
        // Nanti kalau udah ada tabelnya, tinggal ganti jadi Laporan::all()
        $laporan = [
            [
                'id' => 1,
                'nama' => "Pengawas Ujian MAN 7",
                'tanggal' => "08 Mar 2026",
                'jam' => "09:45",
                'status' => "pending"
            ],
            [
                'id' => 2,
                'nama' => "Laporan Harian - Ahmad",
                'tanggal' => "10 Mar 2026",
                'jam' => "13:20",
                'status' => "pending"
            ],
        ];

        return Inertia::render('VerifikasiLaporan', [
            'laporanData' => $laporan
        ]);
    }

    public function show($id)
{
    // dummy dulu
    $laporan = [
        'id' => $id,
        'nama' => "Pengawas Ujian MAN 7",
        'tanggal' => "08 Mar 2026",
        'deskripsi' => "Lorem ipsum laporan detail lengkap",
    ];

    return Inertia::render('DetailLaporan', [
        'laporan' => $laporan,
        'user' => Auth::user()
    ]);
}

    /**
     * Fungsi buat nerima atau nolak laporan
     */
    public function updateStatus(Request $request, $id)
    {
        // Logika update status ke database nanti di sini
        // $laporan = Laporan::findOrFail($id);
        // $laporan->update(['status' => $request->status]);

        return redirect()->back()->with('message', 'Status laporan diperbarui!');
    }
}