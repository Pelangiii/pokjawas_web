<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ManajemenController extends Controller
{
    /**
     * Redirect ke halaman daftar berita
     */
    public function index()
    {
        return redirect()->route('berita.index');
    }
}