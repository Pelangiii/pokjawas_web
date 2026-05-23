<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Berita;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BeritaController extends Controller
{
    
    public function index(Request $request)
{
    $query = Berita::query();

    // ✅ SEARCH (TAMBAHIN DI SINI)
    if ($request->filled('search')) {
        $query->where('judul', 'like', '%' . $request->search . '%');
    }

    // ✅ FILTER (punya lu tetap)
 // FILTER
switch ($request->filter) {
    case 'hari-ini':
        $query->whereDate('created_at', today());
        break;

    case 'terlama':
        $query->orderBy('created_at', 'asc');
        break;

    case 'semua':
    default:
        $query->orderBy('created_at', 'desc');
        break;
}

    // ✅ GET DATA
    $berita = $query->get()->map(function ($item) {
        return [
            'id' => $item->id,
            'judul' => $item->judul,
            'isi' => $item->isi,
            'kategori' => $item->kategori,
            'gambar' => $item->gambar,
            'created_at' => $item->created_at->format('d/m/y'),
        ];
    });

    return Inertia::render('Berita', [
        'berita' => $berita
    ]);
}

    public function create()
    {
        return Inertia::render('TambahBerita');
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul'    => 'required|string|max:255',
            'isi'      => 'required|string',
            'kategori' => 'nullable|string',
            'gambar'   => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $gambarPath = null;
        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $filename = time() . '_' . $file->getClientOriginalName();
            // Simpan di folder public/berita
            $gambarPath = $file->storeAs('berita', $filename, 'public');
        }

        Berita::create([
            'judul'    => $request->judul,
            'isi'      => $request->isi,
            'kategori' => $request->kategori,
            'gambar'   => $gambarPath,
        ]);

       return redirect()->route('berita.index');
    }

    public function destroy($id)
    {
        $berita = Berita::findOrFail($id);
        if ($berita->gambar) {
            Storage::disk('public')->delete($berita->gambar);
        }
        $berita->delete();
        return redirect()->back();
    }

    public function edit($id)
    {
        $berita = Berita::findOrFail($id);

        return Inertia::render('EditBerita', [
            'berita' => $berita
        ]);
    }

    //  Simpan hasil edit
    public function update(Request $request, $id)
    {
        $berita = Berita::findOrFail($id);

        $data = $request->validate([
            'judul' => 'required',
            'kategori' => 'required',
            'isi' => 'required',
            'gambar' => 'nullable|image',
        ]);

        unset($data['gambar']);

        if ($request->hasFile('gambar')) {
             // hapus gambar lama
             if ($berita->gambar) {
                Storage::disk('public')->delete($berita->gambar);
                }

            // simpan gambar baru
        $data['gambar'] = $request->file('gambar')->store('berita', 'public');
        }
        $berita->update($data);
        
    }
}