import React from "react";
import { router } from "@inertiajs/react";

export default function UserLayout({ children }) {
  return (
    <div className="flex bg-[#F5F7FB] min-h-screen">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r px-6 py-6 flex flex-col justify-between">

        <div>
          <h1 className="font-bold mb-6">User Panel</h1>

          <div
            onClick={() => router.get('/user/dashboard')}
            className="cursor-pointer px-4 py-2 rounded-xl hover:bg-gray-100"
          >
            📊 Dashboard
          </div>

          <div
            onClick={() => router.get('/user/laporan')}
            className="cursor-pointer px-4 py-2 rounded-xl hover:bg-gray-100"
          >
            📄 Laporan
          </div>
        </div>

      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  );
}