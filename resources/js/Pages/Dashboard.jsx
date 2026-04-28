import React, { useState, useEffect, useRef } from "react";
import { router, usePage } from "@inertiajs/react";
import {
  LayoutDashboard,
  Users,
  Newspaper,
  ClipboardCheck,
  Mail,
  Bell,
  LogOut,
  Check,
  X,
  Eye,
  UserCheck,
  UserMinus,
  UsersRound,
  ChevronRight
} from "lucide-react";

export default function AdminDashboard() {
  const { props, url } = usePage();
  const user = props.auth?.user;
  const [showNotif, setShowNotif] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const notifRef = useRef();

  const menuClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition font-medium
    ${url.startsWith(path)
      ? "bg-green-100 text-green-700 shadow-sm"
      : "text-gray-500 hover:bg-gray-100"
    }`;

  return (
    <div className="flex min-h-screen bg-[#F4F6FA] font-sans text-gray-900">

      {/* ================= LOGOUT MODAL ================= */}
      {showLogout && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-lg font-bold mb-2">Konfirmasi Logout</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu yakin mau keluar dari sistem?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowLogout(false)} className="px-4 py-2 rounded-lg border font-semibold hover:bg-gray-50 transition text-sm">Batal</button>
              <button onClick={() => router.post('/logout')} className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition text-sm">Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r flex flex-col justify-between p-6 fixed h-full shadow-sm z-50">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <img src="/images/pokjawas.png" className="w-10 h-10 object-contain" alt="Logo" />
            <div>
              <h1 className="font-bold text-gray-800 leading-tight text-sm">Pokjawas Kemenag</h1>
              <p className="text-[10px] text-gray-400 font-medium">Kabupaten Tangerang</p>
            </div>
          </div>

          <p className="text-[10px] text-gray-400 mb-4 uppercase font-bold tracking-widest px-2">Menu Utama</p>
          <nav className="space-y-1">
            <div onClick={() => router.get('/admin/dashboard')} className={menuClass('/admin/dashboard')}>
              <LayoutDashboard size={18} /> Dashboard
            </div>
            <div onClick={() => router.get('/admin/users')} className={menuClass('/admin/users')}>
              <Users size={18} /> Manajemen User
            </div>
            <div onClick={() => router.get('/admin/berita')} className={menuClass('/admin/berita')}>
              <Newspaper size={18} /> Manajemen Berita
            </div>
            <div onClick={() => router.get('/admin/verifikasi')} className={menuClass('/admin/verifikasi')}>
              <ClipboardCheck size={18} /> Verifikasi Laporan
            </div>
          </nav>
        </div>

        <button onClick={() => setShowLogout(true)} className="flex items-center gap-2 px-4 py-3 text-gray-400 hover:text-red-500 transition font-bold text-sm">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 ml-64">

        {/* NAVBAR */}
        <div className="flex justify-between items-center px-8 py-6 bg-white border-b sticky top-0 z-40 shadow-sm">
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Admin Dashboard</h1>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="relative flex items-center justify-center" ref={notifRef}>
                <Bell size={20} className="cursor-pointer text-gray-400 hover:text-green-600 transition" onClick={() => setShowNotif(!showNotif)} />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </div>
            </div>

            {/* Divider Outside Bell */}
            <div className="h-6 w-px bg-gray-200"></div>

            <div onClick={() => router.get('/admin/profile')} className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800 group-hover:text-green-700 transition">{user?.name || "Fio"}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-green-700 text-white flex items-center justify-center font-bold shadow-md shadow-green-900/20">
                {user?.name?.charAt(0) || "F"}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">

          {/* WELCOME BANNER */}
          <div className="bg-green-800 text-white rounded-[2rem] p-10 shadow-lg shadow-green-900/10 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2 text-white">
                Selamat Datang, {user?.name || "Admin"} 👋
              </h2>
              <p className="text-green-100/80 text-sm">
                Kelola seluruh data pengawas, berita madrasah, dan laporan dengan mudah dan cepat.
              </p>
            </div>
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          </div>

          {/* BARIS STATS & BERITA (EQUAL HEIGHT) */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
            
            {/* STATUS PENGGUNA */}
            <section className="flex flex-col">
              <div className="flex items-center gap-2 mb-6 px-2">
                <UsersRound className="text-green-700" size={20} />
                <h3 className="text-lg font-bold text-gray-800">Status Pengguna</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 flex-1">
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between hover:border-green-300 transition group">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition">
                    <UserCheck size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Online</p>
                    <p className="text-2xl font-black text-gray-800">23</p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between hover:border-red-300 transition group">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition">
                    <UserMinus size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Offline</p>
                    <p className="text-2xl font-black text-gray-800">13</p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between hover:border-blue-300 transition group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                    <UsersRound size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total</p>
                    <p className="text-2xl font-black text-gray-800">36</p>
                  </div>
                </div>
              </div>
            </section>

            {/* MANAJEMEN BERITA */}
            <section className="flex flex-col">
              <div className="flex justify-between items-center mb-6 px-2">
                <div className="flex items-center gap-2">
                  <Newspaper className="text-green-700" size={20} />
                  <h3 className="text-lg font-bold text-gray-800">Berita Terbaru</h3>
                </div>
                <button onClick={() => router.get('/admin/berita')} className="text-xs font-bold text-green-700 hover:bg-green-50 px-3 py-1.5 rounded-lg transition flex items-center gap-1">
                  Kelola <ChevronRight size={14} />
                </button>
              </div>
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4 flex-1 flex flex-col justify-center">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-2 rounded-2xl hover:bg-gray-50 transition cursor-pointer group">
                    <div className="w-16 h-14 rounded-2xl bg-gray-100 flex-shrink-0 group-hover:bg-white transition flex items-center justify-center overflow-hidden font-bold text-[10px] text-gray-400 border border-transparent group-hover:border-gray-100">NEWS</div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-green-600 uppercase mb-0.5 tracking-tight">Informasi</p>
                      <p className="text-sm font-bold text-gray-800 line-clamp-1 leading-tight">Workshop Peningkatan Mutu Madrasah Tangerang...</p>
                      <p className="text-[10px] text-gray-400 mt-1">20 Mar 2026</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* VERIFIKASI LAPORAN (Updated Icons & Title Style) */}
          <section className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-8 px-2">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="text-green-700" size={20} />
                <h3 className="text-lg font-bold text-gray-800 italic-none">Verifikasi Laporan Terbaru</h3>
              </div>
              <button className="text-sm font-bold text-green-700 hover:underline">Lihat Semua</button>
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-5 rounded-3xl border border-gray-50 hover:bg-gray-50 hover:border-green-200 transition group">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 text-[10px] font-black group-hover:bg-white transition shadow-inner">DOC</div>
                    <div>
                      <p className="font-bold text-gray-800 text-base">Pengawas Ujian MAN 7</p>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-tight opacity-70">18 Mar 2026 • 09.45 WIB</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="p-3 rounded-2xl bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition shadow-sm shadow-green-100 group-hover:shadow-green-200">
                      <Check size={20} strokeWidth={3} />
                    </button>
                    <button className="p-3 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition shadow-sm shadow-red-100 group-hover:shadow-red-200">
                      <X size={20} strokeWidth={3} />
                    </button>
                    <button className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:bg-gray-800 hover:text-white transition shadow-sm group-hover:shadow-gray-200">
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