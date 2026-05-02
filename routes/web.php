<?php
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\User\LaporanController;
use App\Http\Controllers\User\ProfileController as UserProfileController; // 🔥 FIX
use App\Models\Laporan;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

/* ================= LANDING ================= */
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/* ================= DASHBOARD & UMUM ================= */
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // BERITA
    Route::get('/manajemen', [BeritaController::class, 'index'])->name('manajemen.index');
    Route::get('/berita/tambah', [BeritaController::class, 'create'])->name('berita.create');
    Route::post('/berita', [BeritaController::class, 'store'])->name('berita.store');
    Route::delete('/berita/{id}', [BeritaController::class, 'destroy'])->name('berita.destroy');


Route::get('/berita', [BeritaController::class, 'index']);

Route::post('/berita', [BeritaController::class, 'store'])
    ->middleware(['auth']);

Route::get('/berita/tambah', [BeritaController::class, 'create'])->name('berita.create');

// Proses Simpan Data
Route::post('/berita', [BeritaController::class, 'store'])->name('berita.store');

// Halaman utama manajemen
Route::get('/manajemen', [BeritaController::class, 'index'])->name('manajemen.index');

// Halaman buat input berita (Ini yang tadi error karena fungsinya ga ada)
Route::get('/berita/tambah', [BeritaController::class, 'create'])->name('berita.create');

// Proses nyimpen datanya
Route::post('/berita', [BeritaController::class, 'store'])->name('berita.store');

// ngeupdate data
Route::put('/berita/{id}', [BeritaController::class, 'update']);

// Proses hapus
Route::delete('/berita/{id}', [BeritaController::class, 'destroy'])->name('berita.destroy');
Route::get('/berita/{id}/edit', [BeritaController::class, 'edit'])->name('berita.edit');

// URL: /verifikasilaporan (Kecil semua, tanpa strip)
Route::get('/verifikasilaporan', [LaporanController::class, 'index'])->name('verifikasi.index');

Route::patch('/verifikasilaporan/{id}/status', [LaporanController::class, 'updateStatus'])->name('verifikasi.update');

Route::get('/verifikasilaporan/{id}', [LaporanController::class, 'show'])->name('verifikasi.show');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // USER MANAGEMENT
    Route::resource('/users', UserController::class);
});

/* ================= ADMIN AREA ================= */
Route::middleware(['auth'])->prefix('admin')->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('AdminDashboard');
    })->name('admin.dashboard');

    Route::get('/users-list', function () {
        return Inertia::render('Admin/Users/Index');
    })->name('admin.users');
});

/* ================= USER AREA ================= */
Route::middleware(['auth'])->prefix('user')->group(function () {

    // ✅ DASHBOARD USER
    Route::get('/dashboard', function () {
        $laporans = Laporan::where('user_id', Auth::id())
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('User/UserDashboard', [
            'laporans' => $laporans
        ]);
    })->name('user.dashboard');

    // ✅ LAPORAN
    Route::get('/laporan', [LaporanController::class, 'index'])->name('user.laporan');
    Route::get('/laporan/create', [LaporanController::class, 'create']);
    Route::post('/laporan', [LaporanController::class, 'store']);
    Route::get('/laporan/{id}', [LaporanController::class, 'show']);
    Route::get('/laporan/{id}/edit', [LaporanController::class, 'edit']);
    Route::put('/laporan/{id}', [LaporanController::class, 'update']);
    Route::delete('/laporan/{id}', [LaporanController::class, 'destroy']);

    // ✅ PROFILE USER (FIX UTAMA DI SINI)
    Route::get('/profile', [UserProfileController::class, 'index'])->name('user.profile');
    Route::get('/profile/edit', [UserProfileController::class, 'edit']);
    Route::post('/profile', [UserProfileController::class, 'update']);
});

require __DIR__.'/auth.php';