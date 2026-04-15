<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Berita;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BeritaController extends Controller
{
    /**
     * Menampilkan halaman manajemen beserta data beritanya
     */
    public function index()
    {
        return Inertia::render('Manajemen', [
            'berita' => Berita::latest()->get()->map(function ($item) {
                return [
                    'id' => $item->id,
                    'judul' => $item->judul,
                    'isi' => $item->isi,
                    'kategori' => $item->kategori,
                    'gambar' => $item->gambar,
                    'created_at' => $item->created_at->format('d/m/y'),
                ];
            })
        ]);
    }

    /**
     * Proses simpan berita
     */
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'judul'    => 'required|string|max:255',
            'isi'      => 'required|string',
            'kategori' => 'nullable|string',
            'gambar'   => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $gambarPath = null;
        if ($request->hasFile('gambar')) {
            // Simpan dengan nama unik
            $file = $request->file('gambar');
            $filename = time() . '_' . $file->getClientOriginalName();
            $gambarPath = $file->storeAs('berita', $filename, 'public');
            
            // Cek apakah file berhasil disimpan
            if (!$gambarPath) {
                return redirect()->back()->withErrors(['gambar' => 'Gagal upload gambar']);
            }
        }

        Berita::create([
            'judul'    => $request->judul,
            'isi'      => $request->isi,
            'kategori' => $request->kategori,
            'gambar'   => $gambarPath,
        ]);

        return redirect()->back();
    }

    /**
     * Hapus berita
     */
    public function destroy($id)
    {
        $berita = Berita::findOrFail($id);
        
        // Hapus file gambar kalo ada
        if ($berita->gambar && Storage::disk('public')->exists($berita->gambar)) {
            Storage::disk('public')->delete($berita->gambar);
        }
        
        $berita->delete();
        
        return redirect()->back();
    }

    /**
     * Show edit form
     */
    public function edit($id)
    {
        $berita = Berita::findOrFail($id);
        
        return Inertia::render('Berita/Edit', [
            'berita' => $berita
        ]);
    }

    /**
     * Update berita
     */
    public function update(Request $request, $id)
    {
        $berita = Berita::findOrFail($id);
        
        $request->validate([
            'judul'    => 'required|string|max:255',
            'isi'      => 'required|string',
            'kategori' => 'nullable|string',
            'gambar'   => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Update gambar kalo ada upload baru
        if ($request->hasFile('gambar')) {
            // Hapus gambar lama
            if ($berita->gambar && Storage::disk('public')->exists($berita->gambar)) {
                Storage::disk('public')->delete($berita->gambar);
            }
            
            // Upload gambar baru
            $file = $request->file('gambar');
            $filename = time() . '_' . $file->getClientOriginalName();
            $gambarPath = $file->storeAs('berita', $filename, 'public');
            $berita->gambar = $gambarPath;
        }

        $berita->judul = $request->judul;
        $berita->isi = $request->isi;
        $berita->kategori = $request->kategori;
        $berita->save();

        return redirect()->route('manajemen');
    }
}