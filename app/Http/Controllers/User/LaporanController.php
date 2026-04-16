<?php
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Laporan;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class LaporanController extends Controller
{
    public function index()
    {
        $laporans = Laporan::where('user_id', Auth::id())->latest()->get();

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
            'title' => 'required'
        ]);

        Laporan::create([
            'user_id' => Auth::id(),
            'title' => $request->title
        ]);

        return redirect('/user/laporan');
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

        $laporan->update([
            'title' => $request->title
        ]);

        return redirect('/user/laporan');
    }
}
