import React from "react";
import { router } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

export default function Index({ laporans }) {
  return (
    <UserLayout title="Laporan">

      {/* SEARCH + ACTION */}
      <div className="flex justify-between items-center mb-6">

        {/* SEARCH */}
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            🔍
          </span>
        </div>

        {/* BUTTON */}
        <div className="flex gap-2">
          <button
            onClick={() => router.get('/user/laporan/create')}
            className="w-10 h-10 flex items-center justify-center border rounded-xl hover:bg-gray-100 text-lg"
          >
            +
          </button>

          <button className="w-10 h-10 flex items-center justify-center border rounded-xl hover:bg-gray-100">
            ⚙️
          </button>
        </div>

      </div>

      {/* LIST */}
      <div className="space-y-4">

        {laporans.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition"
          >

            {/* LEFT */}
            <div className="flex items-center gap-4">

              <img
                src="https://via.placeholder.com/60"
                alt=""
                className="w-14 h-14 rounded-xl object-cover"
              />

              <p className="font-semibold text-gray-800 text-lg">
                {item.title}
              </p>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-5 text-xl">

              <span
                onClick={() => router.get(`/user/laporan/${item.id}`)}
              >
                👁️
              </span>

              <span
                onClick={() => router.get(`/user/laporan/${item.id}/edit`)}
                className="cursor-pointer text-yellow-500 hover:scale-110"
              >
                ✏️
              </span>

              <span
                onClick={() => {
                  if (confirm("Yakin mau hapus?")) {
                    router.delete(`/user/laporan/${item.id}`);
                  }
                }}
                className="cursor-pointer text-red-500 hover:scale-110"
              >
                🗑️
              </span>

            </div>

          </div>
        ))}

      </div>

    </UserLayout>
  );
}