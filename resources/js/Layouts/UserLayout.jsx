import React, { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import { LayoutDashboard, FileText, Mail, Bell, LogOut } from "lucide-react";

export default function UserLayout({ children, title }) {

  const { props, url } = usePage();

  const user = props.auth?.user;
  const notifications = props.notifications || [];
  const flash = props.flash || {};

  const currentPath = url;

  const [showNotif, setShowNotif] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  // 🔥 POPUP SUCCESS
  useEffect(() => {
    if (flash.success) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  }, [flash.success]);

  const menuClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition font-medium
    ${
      currentPath.startsWith(path)
        ? "bg-green-100 text-green-700"
        : "text-gray-500 hover:bg-gray-100"
    }`;

  return (
    <div className="flex min-h-screen bg-[#F4F6FA]">

      {/* 🔥 POPUP SUCCESS */}
      {showPopup && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-[999] animate-bounce">
          {flash.success}
        </div>
      )}

      {/* 🔥 LOGOUT MODAL */}
      {showLogout && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">

            <h2 className="text-lg font-semibold mb-2">
              Konfirmasi Logout
            </h2>

            <p className="text-sm text-gray-500 mb-5">
              Kamu yakin mau keluar?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogout(false)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Batal
              </button>

              <button
                onClick={() => router.post('/logout')}
                className="px-4 py-2 rounded-lg bg-red-500 text-white"
              >
                Logout
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r flex flex-col justify-between p-6">

        <div>
          {/* LOGO */}
          <div className="flex items-center gap-3 mb-10">
            <img
              src="/logo.png" // ganti kalau ada logo asli
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="font-semibold text-gray-800">
                Pokjawas Kemenag
              </h1>
              <p className="text-xs text-gray-400">
                Kabupaten Tangerang
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-400 mb-3">Menu</p>

          {/* MENU */}
          <nav className="space-y-2">

            <div
              onClick={() => router.get('/user/dashboard')}
              className={menuClass('/user/dashboard')}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </div>

            <div
              onClick={() => router.get('/user/laporan')}
              className={menuClass('/user/laporan')}
            >
              <FileText size={18} />
              Laporan
            </div>

          </nav>
        </div>

        {/* LOGOUT */}
        <button
          onClick={() => setShowLogout(true)}
          className="flex items-center gap-2 text-gray-500 hover:text-red-500"
        >
          <LogOut size={18} />
          Logout
        </button>

      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1">

        {/* ================= NAVBAR ================= */}
        <div className="flex justify-between items-center px-8 py-6 bg-white border-b">

          {/* TITLE */}
          <h1 className="text-3xl font-semibold text-gray-800">
            {title}
          </h1>

          <div className="flex items-center gap-6">

            {/* ICON */}
            <Mail className="text-gray-500" size={20} />

            {/* 🔔 NOTIFICATION */}
            <div className="relative">
              <Bell
                size={20}
                className="cursor-pointer text-gray-500"
                onClick={() => setShowNotif(!showNotif)}
              />

              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                  {notifications.length}
                </span>
              )}

              {/* DROPDOWN */}
              {showNotif && (
                <div className="absolute right-0 mt-3 w-72 bg-white shadow-lg rounded-xl border z-50">

                  {notifications.length === 0 ? (
                    <p className="p-4 text-gray-400 text-sm">
                      Tidak ada notifikasi
                    </p>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() =>
                          router.get(`/user/laporan/${item.id}/edit`)
                        }
                        className="p-3 border-b hover:bg-gray-100 cursor-pointer"
                      >
                        <p className="text-sm font-semibold text-red-500">
                          Laporan Direvisi
                        </p>
                        <p className="text-xs text-gray-600 truncate">
                          {item.feedback}
                        </p>
                      </div>
                    ))
                  )}

                </div>
              )}
            </div>

            {/* DIVIDER */}
            <div className="h-6 w-px bg-gray-300"></div>

            {/* PROFILE */}
            <div
              onClick={() => router.get('/user/profile')}
              className="flex items-center gap-3 cursor-pointer"
            >

              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-400">
                  PEGAWAI
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center overflow-hidden font-semibold">
                {user?.avatar ? (
                  <img
                    src={`/storage/${user.avatar}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.name?.charAt(0)?.toUpperCase()
                )}
              </div>

            </div>

          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8">
          {children}
        </div>

      </main>
    </div>
  );
}