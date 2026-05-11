import React, { useState, useRef } from "react";
import Sidebar from "@/Components/Sidebar";
import { router, usePage } from "@inertiajs/react";
import {
  Newspaper,
  ClipboardCheck,
  Bell,
  LogOut,
  Check,
  X,
  Eye,
  UserCheck,
  UserMinus,
  UsersRound,
  ChevronRight,
} from "lucide-react";

export default function AdminDashboard() {
  const { props } = usePage();
  const user = props.auth?.user;

  const [showNotif, setShowNotif] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const notifRef = useRef();

  return (
    <div className="flex min-h-screen bg-[#F4F6FA] font-sans text-gray-900">

      {/* ================= LOGOUT MODAL ================= */}
      {showLogout && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
            <h2 className="text-lg font-bold mb-2">
              Konfirmasi Logout
            </h2>

            <p className="text-sm text-gray-500 mb-5">
              Kamu yakin mau keluar dari sistem?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogout(false)}
                className="px-4 py-2 rounded-lg border font-semibold hover:bg-gray-50 transition text-sm"
              >
                Batal
              </button>

              <button
                onClick={() => router.post("/logout")}
                className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SIDEBAR ================= */}
      <Sidebar />

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 ml-0 lg:ml-64">

        {/* ================= NAVBAR ================= */}
        <div className="flex justify-between items-center pl-20 lg:pl-8 pr-4 lg:pr-8 py-6 bg-white border-b sticky top-0 z-40 shadow-sm">

          {/* TITLE */}
          <h1 className="text-2xl lg:text-3xl font-black text-gray-800 tracking-tight">
            Dashboard
          </h1>

          {/* RIGHT */}
          <div className="flex items-center gap-3 lg:gap-6">

            {/* NOTIF */}
            <div
              className="relative flex items-center justify-center"
              ref={notifRef}
            >
              <Bell
                size={20}
                className="cursor-pointer text-gray-400 hover:text-green-600 transition"
                onClick={() => setShowNotif(!showNotif)}
              />

              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </div>

            {/* DIVIDER */}
            <div className="hidden sm:block h-6 w-px bg-gray-200"></div>

            {/* PROFILE */}
            <div
              onClick={() => router.get("/admin/profile")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-800 group-hover:text-green-700 transition">
                  {user?.name || "Admin"}
                </p>

                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  Administrator
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-green-700 text-white flex items-center justify-center font-bold shadow-md shadow-green-900/20">
                {user?.name?.charAt(0) || "F"}
              </div>
            </div>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="p-4 lg:p-8 space-y-8">

          {/* ================= WELCOME ================= */}
          <div className="bg-green-800 text-white rounded-[2rem] p-6 lg:p-10 shadow-lg shadow-green-900/10 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-white">
                Selamat Datang, {user?.name || "Admin"} 👋
              </h2>

              <p className="text-green-100/80 text-sm">
                Kelola seluruh data pengawas, berita madrasah,
                dan laporan dengan mudah dan cepat.
              </p>
            </div>

            <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          </div>

          {/* ================= STATS & BERITA ================= */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">

            {/* STATUS */}
            <section className="flex flex-col">

              <div className="flex items-center gap-2 mb-6 px-2">
                <UsersRound
                  className="text-green-700"
                  size={20}
                />

                <h3 className="text-lg font-bold text-gray-800">
                  Status Pengguna
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">

                {/* ONLINE */}
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between hover:border-green-300 transition group">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition">
                    <UserCheck size={24} />
                  </div>

                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Online
                    </p>

                    <p className="text-2xl font-black text-gray-800">
                      23
                    </p>
                  </div>
                </div>

                {/* OFFLINE */}
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between hover:border-red-300 transition group">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition">
                    <UserMinus size={24} />
                  </div>

                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Offline
                    </p>

                    <p className="text-2xl font-black text-gray-800">
                      13
                    </p>
                  </div>
                </div>

                {/* TOTAL */}
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between hover:border-blue-300 transition group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                    <UsersRound size={24} />
                  </div>

                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Total
                    </p>

                    <p className="text-2xl font-black text-gray-800">
                      36
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* BERITA */}
            <section className="flex flex-col">

              <div className="flex justify-between items-center mb-6 px-2">
                <div className="flex items-center gap-2">
                  <Newspaper
                    className="text-green-700"
                    size={20}
                  />

                  <h3 className="text-lg font-bold text-gray-800">
                    Berita Terbaru
                  </h3>
                </div>

                <button
                  onClick={() => router.get("/admin/berita")}
                  className="text-xs font-bold text-green-700 hover:bg-green-50 px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                >
                  Kelola
                  <ChevronRight size={14} />
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4 flex-1 flex flex-col justify-center">

                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-2 rounded-2xl hover:bg-gray-50 transition cursor-pointer group"
                  >
                    <div className="w-16 h-14 rounded-2xl bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden font-bold text-[10px] text-gray-400 border border-transparent group-hover:border-gray-100">
                      NEWS
                    </div>

                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-green-600 uppercase mb-0.5 tracking-tight">
                        Informasi
                      </p>

                      <p className="text-sm font-bold text-gray-800 line-clamp-1 leading-tight">
                        Workshop Peningkatan Mutu Madrasah Tangerang...
                      </p>

                      <p className="text-[10px] text-gray-400 mt-1">
                        20 Mar 2026
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ================= VERIFIKASI ================= */}
          <section className="bg-white rounded-[2rem] p-4 lg:p-8 border border-gray-100 shadow-sm">

            <div className="flex justify-between items-center mb-8 px-2">

              <div className="flex items-center gap-2">
                <ClipboardCheck
                  className="text-green-700"
                  size={20}
                />

                <h3 className="text-lg font-bold text-gray-800">
                  Verifikasi Laporan Terbaru
                </h3>
              </div>

              <button className="text-sm font-bold text-green-700 hover:underline">
                Lihat Semua
              </button>
            </div>

            <div className="space-y-4">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-3xl border border-gray-50 hover:bg-gray-50 hover:border-green-200 transition group"
                >

                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 text-[10px] font-black">
                      DOC
                    </div>

                    <div>
                      <p className="font-bold text-gray-800 text-base">
                        Pengawas Ujian MAN 7
                      </p>

                      <p className="text-xs text-gray-400 font-bold uppercase tracking-tight opacity-70">
                        18 Mar 2026 • 09.45 WIB
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">

                    <button className="p-3 rounded-2xl bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition">
                      <Check size={20} strokeWidth={3} />
                    </button>

                    <button className="p-3 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition">
                      <X size={20} strokeWidth={3} />
                    </button>

                    <button className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:bg-gray-800 hover:text-white transition">
                      <Eye size={20} strokeWidth={3} />
                    </button>

                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}