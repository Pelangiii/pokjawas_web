<?php

use App\Http\Controllers\ReportController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\User\LaporanController as UserLaporanController;
use App\Http\Controllers\User\ProfileController as UserProfileController;
use App\Models\Laporan;
use App\Models\Berita;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

/* ================= 1. LANDING PAGE & HALAMAN PUBLIK (FRONTEND) ================= */

Route::get('/', function () {
    // Mengambil 3 berita terbaru dari database untuk ditampilkan di Landing Page secara otomatis
    $beritas = [];
    if (class_exists(Berita::class)) {
        $beritas = Berita::latest()->take(3)->get();
    }

    return Inertia::render('Landing_Page', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'beritas' => $beritas, // Mengalirkan data asli dari database ke landing page React
    ]);
})->name('home');

// Jalur navigasi menu publik frontend
Route::get('/struktur', function () { return Inertia::render('Struktur_Anggota'); })->name('struktur');
Route::get('/berita', function () { return Inertia::render('Berita/Berita_Lain'); })->name('berita');
Route::get('/berita/{id}', function ($id) { return Inertia::render('Berita/Detail_Berita', ['id' => $id]); })->name('berita.detail');
Route::get('/kegiatan', function () { return Inertia::render('Kegiatan/Kegiatan_Lain'); })->name('kegiatan');
Route::get('/kegiatan/{id}', function ($id) { return Inertia::render('Kegiatan/Detail_Kegiatan', ['id' => $id]); })->name('kegiatan.detail');

/* ================= 2. DASHBOARD & AUTH UMUM (BACKEND) ================= */

Route::middleware(['auth'])->group(function () {
    // Manajemen Berita (Bisa diakses user terautentikasi yang berhak)
    Route::get('/berita-admin', [BeritaController::class, 'index'])->name('berita.index');
    Route::get('/berita/tambah', [BeritaController::class, 'create'])->name('berita.create');
    Route::post('/berita', [BeritaController::class, 'store'])->name('berita.store');
    Route::get('/berita/{id}/edit', [BeritaController::class, 'edit'])->name('berita.edit');
    Route::put('/berita/{id}', [BeritaController::class, 'update'])->name('berita.update');
    Route::delete('/berita/{id}', [BeritaController::class, 'destroy'])->name('berita.destroy');

    // Manajemen Pengguna (User Management)
    Route::resource('/users', UserController::class);

    // Manajemen Profil Standar Utama
    Route::get('/profile', [UserProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [UserProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [UserProfileController::class, 'destroy'])->name('profile.destroy');
});

/* ================= 3. ADMIN AREA (BACKEND) ================= */

Route::middleware(['auth'])->prefix('admin')->group(function () {

    // Dashboard Admin Utama (Menampilkan statistik berita & laporan terbaru)
    Route::get('/dashboard', function () {
        $beritas = class_exists(Berita::class) ? Berita::latest()->take(5)->get() : [];
        $laporans = class_exists(Laporan::class) ? Laporan::with('user')->latest()->take(5)->get() : [];

        return Inertia::render('AdminDashboard', [
            'beritas' => $beritas,
            'laporans' => $laporans 
        ]);
    })->name('admin.dashboard');

    // Sistem Verifikasi Laporan Masuk oleh Admin
    Route::get('/verifikasilaporan', [ReportController::class, 'verifikasi'])->name('verifikasi.index');
    Route::patch('/verifikasilaporan/{id}/status', [ReportController::class, 'updateStatus'])->name('verifikasi.update');
    Route::get('/verifikasilaporan/{id}', [ReportController::class, 'show'])->name('verifikasi.show');

    // Halaman Profil Admin
    Route::get('/profile', function () { return Inertia::render('AdminProfile'); })->name('admin.profile');
});

/* ================= 4. USER AREA (BACKEND) ================= */

Route::middleware(['auth'])->prefix('user')->group(function () {

    // Dashboard Pengguna Biasa/Anggota
    Route::get('/dashboard', function () {
        $laporans = class_exists(Laporan::class) ? Laporan::where('user_id', Auth::id())->latest()->take(5)->get() : [];
        return Inertia::render('User/UserDashboard', [
            'laporans' => $laporans
        ]);
    })->name('user.dashboard');

    // Fitur CRUD Laporan dari Sisi User
    Route::get('/laporan', [UserLaporanController::class, 'index'])->name('user.laporan');
    Route::get('/laporan/create', [UserLaporanController::class, 'create']);
    Route::post('/laporan', [UserLaporanController::class, 'store']);
    Route::get('/laporan/{id}', [UserLaporanController::class, 'show']);
    Route::get('/laporan/{id}/edit', [UserLaporanController::class, 'edit']);
    Route::put('/laporan/{id}', [UserLaporanController::class, 'update']);
    Route::delete('/laporan/{id}', [UserLaporanController::class, 'destroy']);

    // Profil Khusus Sisi User
    Route::get('/profile', [UserProfileController::class, 'index'])->name('user.profile');
    Route::get('/profile/edit', [UserProfileController::class, 'edit']);
    Route::post('/profile', [UserProfileController::class, 'update']);
});

/* ================= 5. AUTHENTICATION SYSTEM ================= */
require __DIR__.'/auth.php';