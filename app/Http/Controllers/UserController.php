<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::latest()->get();

        return Inertia::render('ManagementUser', [
            'users' => $users,
            'filters' => []
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