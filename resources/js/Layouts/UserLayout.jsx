import React from "react";
import { router } from "@inertiajs/react";

export default function UserLayout({ children, title }) {

  const currentPath = window.location.pathname;

  const menuClass = (path) =>
    `flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition
    ${
      currentPath === path
        ? "bg-green-50 text-green-700 font-medium"
        : "text-gray-500 hover:bg-gray-100"
    }`;

  return (
    <div className="flex bg-[#F5F7FB] min-h-screen">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r px-6 py-6 flex flex-col justify-between">

        <div>
          {/* LOGO */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-green-700 rounded-xl"></div>
            <div>
              <h1 className="text-sm font-semibold leading-tight">
                Pokjawas Kemenag
              </h1>
              <p className="text-xs text-gray-400">
                Kab. Tangerang
              </p>
            </div>
          </div>

          <p className="text-gray-400 text-xs mb-4">MENU</p>

          <nav className="space-y-2 text-sm">

            {/* DASHBOARD */}
            <div
              onClick={() => router.get('/user/dashboard')}
              className={menuClass('/user/dashboard')}
            >
              📊 Dashboard
            </div>

            {/* LAPORAN */}
            <div
              onClick={() => router.get('/user/laporan')}
              className={menuClass('/user/laporan')}
            >
              📄 Laporan
            </div>

          </nav>
        </div>

        {/* LOGOUT */}
        <button
          onClick={() => router.post('/logout')}
          className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition"
        >
          🚪 Logout
        </button>

      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">

        {/* NAVBAR */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-2xl font-semibold text-gray-800">
            {title}
          </h1>

          <div className="flex items-center gap-5">

            <div className="text-xl">📧</div>
            <div className="text-xl">🔔</div>

            {/* PROFILE */}
            <div
              onClick={() => router.get('/profile')}
              className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm cursor-pointer hover:shadow-md transition"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold">
                LS
              </div>
              <div className="text-sm">
                <p className="font-medium">Leon Scott</p>
                <p className="text-xs text-gray-400">PEGAWAI</p>
              </div>
            </div>

          </div>
        </div>

        {/* ISI HALAMAN */}
        {children}

      </main>
    </div>
  );
}