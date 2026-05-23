<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Laporan;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $laporans = Laporan::with('user')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('AdminDashboard', [
            'laporans' => $laporans
        ]);
    }
}