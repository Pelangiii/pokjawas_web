<?php

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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/admin/dashboard', function () {
    return Inertia::render('AdminDashboard');
});

// PROFILE PAGE
Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    
});
Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
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
