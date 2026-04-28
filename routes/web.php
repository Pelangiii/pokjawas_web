<?php
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// UPDATE ROUTE MANAJEMEN - tambah name dan middleware
Route::get('/manajemen', function () {
    return Inertia::render('Manajemen');
})->middleware(['auth'])->name('Manajemen');

// Route::get('/berita/create', function () {
//     return Inertia::render('Berita/Create');
// });

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
});

Route::middleware(['auth'])->group(function () {

    Route::get('/admin/dashboard', function () {
        return Inertia::render('AdminDashboard');
    });

    Route::get('/admin/users', function () {
        return Inertia::render('Admin/Users/Index');
    })->name('admin.users');

});

Route::get('/user/dashboard', function () {
    return Inertia::render('UserDashboard');
});

require __DIR__.'/auth.php';
