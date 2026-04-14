import React from "react";
import { router } from "@inertiajs/react";

export default function AdminDashboard() {
  return (
    <div className="flex bg-[#F5F7FB] min-h-screen">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r px-6 py-6 flex flex-col justify-between">

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

            <div className="flex items-center gap-3 bg-green-50 text-green-700 px-4 py-2 rounded-xl font-medium">
              📊 Dashboard
            </div>

            <div className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-xl cursor-pointer">
              👥 Manajemen User
            </div>

            <div className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-xl cursor-pointer">
              📰 Manajemen Berita
            </div>

            <div className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-xl cursor-pointer">
              📄 Verifikasi Laporan
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

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-2xl font-semibold text-gray-800">
            Dashboard
          </h1>

          <div className="flex items-center gap-5">

            <div className="text-xl cursor-pointer">📧</div>
            <div className="text-xl cursor-pointer">🔔</div>

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
                <p className="text-xs text-gray-400">ADMIN</p>
              </div>
            </div>

          </div>
        </div>

        {/* WELCOME */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-6 rounded-2xl mb-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-1">
            Selamat Datang, Leon Scott 👋
          </h2>
          <p className="text-sm opacity-90">
            Ini adalah ringkasan aktivitas Anda di Pokjawas Tangerang
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-6 mb-8">

          {/* BERITA */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border">

            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">
                Manajemen Berita
              </h3>
              <span className="text-sm text-blue-500 cursor-pointer">
                Selengkapnya
              </span>
            </div>

            <p className="text-xs text-gray-400 mb-4">
              Terakhir diupdate :
            </p>

            {[1, 2].map((item) => (
              <div
                key={item}
                className="flex gap-3 items-center p-3 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="w-14 h-10 bg-gray-200 rounded-md"></div>
                <p className="text-xs text-gray-500">
                  Lorem ipsum dolor sit amet consectetur
                </p>
              </div>
            ))}

          </div>

          {/* USER */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border">

            <div
              onClick={() => router.get('/admin/users')}
              className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-xl cursor-pointer"
            >
              👥 Manajemen User
            </div>
            <div className="flex justify-between mt-6">

              <div className="text-center flex-1">
                <div className="text-3xl">🟢</div>
                <p className="text-sm mt-2 text-gray-600">
                  Online
                </p>
                <p className="font-semibold">23</p>
              </div>

              <div className="text-center flex-1">
                <div className="text-3xl">🔴</div>
                <p className="text-sm mt-2 text-gray-600">
                  Offline
                </p>
                <p className="font-semibold">13</p>
              </div>

              <div className="text-center flex-1">
                <div className="text-3xl">👥</div>
                <p className="text-sm mt-2 text-gray-600">
                  Total
                </p>
                <p className="font-semibold">36</p>
              </div>

            </div>

          </div>
        </div>

        {/* VERIFIKASI */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">

          <h3 className="font-semibold text-gray-700 mb-6">
            Verifikasi Laporan
          </h3>

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition mb-3"
            >

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div>
                  <p className="font-medium text-gray-700">
                    Pengawas Ujian MAN 7
                  </p>
                  <p className="text-xs text-gray-400">
                    (18 Mar 2026)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-lg">
                <span className="text-sm text-gray-400">09.45</span>
                <span className="cursor-pointer hover:scale-110">✔️</span>
                <span className="cursor-pointer hover:scale-110">❌</span>
                <span className="cursor-pointer hover:scale-110">👁️</span>
              </div>

            </div>
          ))}

        </div>

      </main>
    </div>
  );
}