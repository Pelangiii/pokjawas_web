<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ManajemenController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('manajemen');
    }
}