import React, { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";

export default function UserLayout({ children, title }) {

  const { props, url } = usePage();

  const user = props.auth?.user;
  const notifications = props.notifications || [];
  const flash = props.flash || {};

  const currentPath = url;

  const [showNotif, setShowNotif] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // 🔥 TRIGGER POPUP
  useEffect(() => {
    if (flash.success) {
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  }, [flash.success]);

  const menuClass = (path) =>
    `flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition
    ${
      currentPath.startsWith(path)
        ? "bg-green-50 text-green-700 font-medium"
        : "text-gray-500 hover:bg-gray-100"
    }`;

  return (
    <div className="flex bg-[#F5F7FB] min-h-screen">

      {/* 🔥 POPUP SUCCESS */}
      {showPopup && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-[999] animate-bounce">
          {flash.success}
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r px-6 py-6 flex flex-col justify-between">

        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-green-700 rounded-xl"></div>
            <div>
              <h1 className="text-sm font-semibold">Pokjawas Kemenag</h1>
              <p className="text-xs text-gray-400">Kab. Tangerang</p>
            </div>
          </div>

          <p className="text-gray-400 text-xs mb-4">MENU</p>

          <nav className="space-y-2 text-sm">
            <div
              onClick={() => router.get('/user/dashboard')}
              className={menuClass('/user/dashboard')}
            >
              📊 Dashboard
            </div>

            <div
              onClick={() => router.get('/user/laporan')}
              className={menuClass('/user/laporan')}
            >
              📄 Laporan
            </div>
          </nav>
        </div>

        <button
          onClick={() => router.post('/logout')}
          className="flex items-center gap-2 text-gray-500 hover:text-red-500"
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

          <div className="flex items-center gap-5 relative">

            <div className="text-xl">📧</div>

            {/* 🔔 NOTIF */}
            <div className="relative">
              <div
                className="text-xl cursor-pointer relative"
                onClick={() => setShowNotif(!showNotif)}
              >
                🔔

                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </div>

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

            {/* PROFILE */}
            <div
              onClick={() => router.get('/user/profile')}
              className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow cursor-pointer"
            >

              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-sm font-semibold">
                {user?.avatar ? (
                  <img
                    src={`/storage/${user.avatar}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.name?.charAt(0)?.toUpperCase() || "U"
                )}
              </div>

              <div className="text-sm">
                <p className="font-medium">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-400">
                  PEGAWAI
                </p>
              </div>

            </div>

          </div>
        </div>

        {children}

      </main>
    </div>
  );
}