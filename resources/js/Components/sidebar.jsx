import { router } from '@inertiajs/react';

export default function Sidebar() {
    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <aside className="w-64 bg-white border-r px-6 py-6 flex flex-col justify-between min-h-screen">
            <div>
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-green-700 rounded-xl"></div>
                    <div>
                        <h1 className="text-sm font-semibold leading-tight">
                            Pokjawas Kemenag
                        </h1>
                        <p className="text-xs text-gray-400">Kab. Tangerang</p>
                    </div>
                </div>

                <p className="text-gray-400 text-xs mb-4">MENU</p>

                <nav className="space-y-2 text-sm">
                    <a 
                        href="/dashboard" 
                        className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-xl cursor-pointer"
                    >
                        📊 Dashboard
                    </a>

                    <a 
                        href="/manajemen-user" 
                        className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-xl cursor-pointer"
                    >
                        👥 Manajemen User
                    </a>

                    <a 
                        href="/manajemen" 
                        className="flex items-center gap-3 bg-green-50 text-green-700 px-4 py-2 rounded-xl font-medium"
                    >
                        📰 Manajemen Berita
                    </a>

                    <a 
                        href="/verifikasi-laporan" 
                        className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-xl cursor-pointer"
                    >
                        📄 Verifikasi Laporan
                    </a>
                </nav>
            </div>

            {/* LOGOUT */}
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition"
            >
                🚪 Logout
            </button>
        </aside>
    );
}