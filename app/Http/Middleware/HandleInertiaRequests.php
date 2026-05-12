<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Laporan;
use Illuminate\Support\Facades\Auth;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [

            // 🔥 AUTH USER
            'auth' => [
                'user' => $request->user(),
            ],

            // 🔥 FLASH MESSAGE GLOBAL (lebih aman)
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
            ],

            // 🔥 NOTIFICATIONS
            'notifications' => function () {
                if (!Auth::check()) return [];

                // return Laporan::where('user_id', Auth::id())
                //     ->where('status', 'revisi')
                //     ->whereNotNull('feedback')
                //     ->latest()
                //     ->get();
                return [];
            },

        ]);
    }
}