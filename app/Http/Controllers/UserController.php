<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
{
    $query = User::latest();

    if ($request->has('search')) {
        $query->where('name', 'like', '%' . $request->search . '%')
              ->orWhere('email', 'like', '%' . $request->search . '%');
    }

    return Inertia::render('Manajement', [
        'users' => $query->get(),
        'filters' => $request->only(['search', 'filter'])
    ]);
}

    public function store(Request $request)
    {
        User::create($request->all());
        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        User::findOrFail($id)->update($request->all());
        return redirect()->back();
    }

    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return redirect()->back();
    }
}