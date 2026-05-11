import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import {
  LayoutDashboard,
  Users,
  Newspaper,
  ClipboardCheck,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

export default function Sidebar() {
  const { url } = usePage();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition font-medium
    ${
      url.startsWith(path)
        ? 'bg-green-100 text-green-700 shadow-sm'
        : 'text-gray-500 hover:bg-gray-100'
    }`;

  return (
    <>
      {/* OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* BUTTON MOBILE */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-md border"
      >
        <Menu size={22} />
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white border-r z-50
          flex flex-col justify-between p-6 shadow-sm
          transition-transform duration-300
          ${
            isSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          }
        `}
      >
        <div>
          {/* LOGO */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <img
                src="/images/pokjawas.png"
                className="w-10 h-10 object-contain"
                alt="Logo"
              />

              <div>
                <h1 className="font-bold text-sm text-slate-800">
                  Pokjawas Kemenag
                </h1>

                <p className="text-[10px] text-gray-400 font-medium">
                  Kabupaten Tangerang
                </p>
              </div>
            </div>

            <button
              className="lg:hidden p-1 text-gray-400"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* MENU TITLE */}
          <p className="text-[10px] text-gray-400 mb-4 uppercase font-bold px-2 tracking-widest">
            Menu Utama
          </p>

          {/* MENU */}
          <nav className="space-y-1">
            <div
              onClick={() => router.get('/admin/dashboard')}
              className={menuClass('/admin/dashboard')}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </div>

            <div
              onClick={() => router.get('/admin/users')}
              className={menuClass('/admin/users')}
            >
              <Users size={18} />
              Manajemen User
            </div>

            <div
              onClick={() => router.get('/admin/berita')}
              className={menuClass('/admin/berita')}
            >
              <Newspaper size={18} />
              Manajemen Berita
            </div>

            <div
              onClick={() => router.get('/admin/verifikasi')}
              className={menuClass('/admin/verifikasi')}
            >
              <ClipboardCheck size={18} />
              Verifikasi Laporan
            </div>
          </nav>
        </div>

        {/* LOGOUT */}
        <button
          onClick={() => router.post('/logout')}
          className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 transition-colors font-medium"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>
    </>
  );
}