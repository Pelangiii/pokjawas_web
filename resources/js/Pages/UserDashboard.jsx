import React from "react";
import { router } from "@inertiajs/react";

export default function UserDashboard() {

  const reports = [
    { status: "Diterima" },
    { status: "Revisi" },
    { status: "Proses" },
    { status: "Diterima" },
    { status: "Diterima" },
  ];

  const getStatusColor = (status) => {
    if (status === "Diterima") return "bg-green-600";
    if (status === "Revisi") return "bg-red-600";
    if (status === "Proses") return "bg-blue-700";
  };

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
                <p className="text-xs text-gray-400">PEGAWAI</p>
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

        {/* LAPORAN USER */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">

          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-700">
              Laporan Anda
            </h3>
            <span className="text-sm text-blue-500 cursor-pointer">
              Selengkapnya...
            </span>
          </div>

          {reports.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl border mb-3 hover:bg-gray-50 transition"
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

              <div className="flex items-center gap-6">
                <span className={`${getStatusColor(item.status)} text-white px-4 py-1 rounded-full text-sm`}>
                  {item.status}
                </span>

                <span className="text-sm text-gray-400">
                  09.45
                </span>
              </div>

            </div>
          ))}

        </div>

      </main>
    </div>
  );
}