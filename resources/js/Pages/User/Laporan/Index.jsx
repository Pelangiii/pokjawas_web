import React, { useState } from "react";
import { router } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

export default function Index({ laporans = [] }) {

  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("terbaru");
  const [search, setSearch] = useState("");

  // 🔥 FILTER + SEARCH + SORT
  const filteredLaporans = [...laporans]

    // SEARCH (judul)
    .filter((item) =>
      item.title?.toLowerCase().includes(search.toLowerCase())
    )

    // FILTER HARI INI
    .filter((item) => {
      if (filter === "hari_ini") {
        const today = new Date().toDateString();
        return new Date(item.created_at).toDateString() === today;
      }
      return true;
    })

    // SORTING
    .sort((a, b) => {
      if (filter === "terlama") {
        return new Date(a.created_at) - new Date(b.created_at);
      }
      return new Date(b.created_at) - new Date(a.created_at);
    });

  return (
    <UserLayout title="Laporan">

      {/* SEARCH + ACTION */}
      <div className="flex justify-between items-center mb-6">

        {/* 🔥 SEARCH */}
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search judul laporan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            🔍
          </span>
        </div>

        <div className="flex gap-2 relative">

          {/* TAMBAH */}
          <button
            onClick={() => router.get('/user/laporan/create')}
            className="w-10 h-10 flex items-center justify-center border rounded-xl hover:bg-gray-100 text-lg"
          >
            +
          </button>

          {/* FILTER */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="w-10 h-10 flex items-center justify-center border rounded-xl hover:bg-gray-100"
          >
            ⚙️
          </button>

          {/* DROPDOWN */}
          {showFilter && (
            <div className="absolute right-0 top-12 bg-white shadow-lg rounded-xl w-40 border z-10">

              <div
                onClick={() => {
                  setFilter("terbaru");
                  setShowFilter(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Terbaru
              </div>

              <div
                onClick={() => {
                  setFilter("terlama");
                  setShowFilter(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Terlama
              </div>

              <div
                onClick={() => {
                  setFilter("hari_ini");
                  setShowFilter(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Hari Ini
              </div>

            </div>
          )}

        </div>
      </div>

      {/* LIST */}
      <div className="space-y-4">

        {filteredLaporans.length === 0 ? (
          <p className="text-gray-400">
            Tidak ada hasil 😢
          </p>
        ) : (
          filteredLaporans.map((item) => {

            const user = item.user || {};

            return (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition"
              >

                {/* LEFT */}
                <div className="flex items-center gap-4">

                  {/* 🔥 FOTO PROFILE USER LOGIN */}
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-sm font-semibold">
                    {user.avatar ? (
                      <img
                        src={`/storage/${user.avatar}`}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user.name?.charAt(0)?.toUpperCase() || "U"
                    )}
                  </div>

                  {/* 🔥 NAMA USER + TITLE */}
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">
                      {user.name || "User"}
                    </p>

                    <p className="text-sm text-gray-400">
                      {item.title}
                    </p>

                    {/* 🔥 STATUS DRAFT */}
                    {item.status === "draft" && (
                      <span className="text-xs text-yellow-500">
                        Draft
                      </span>
                    )}
                  </div>

                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-5 text-xl">

                  <span
                    onClick={() => router.get(`/user/laporan/${item.id}`)}
                    className="cursor-pointer"
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
            );
          })
        )}

      </div>

    </UserLayout>
  );
}