<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Landing_Page'); // pastikan file ada
})->name('home');

Route::get('/struktur', function () {
    return Inertia::render('Struktur');
})->name('struktur');

Route::get('/berita', function () {
    return Inertia::render('Berita');
})->name('berita');

Route::get('/kegiatan', function () {
    return Inertia::render('Kegiatan');
})->name('kegiatan');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/berita/{id}', function ($id) {
    return Inertia::render('Berita/Detail_Berita', [
        'id' => $id
    ]);
})->name('berita.detail');

Route::get('/berita', function () {
    return Inertia::render('Berita/Berita_Lain');
})->name('berita');

Route::get('/kegiatan/{id}', function ($id) {
    return Inertia::render('Kegiatan/Detail_Kegiatan', [
        'id' => $id
    ]);
})->name('kegiatan.detail');

Route::get('/kegiatan', function () {
    return Inertia::render('Kegiatan/Kegiatan_Lain');
})->name('kegiatan');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';