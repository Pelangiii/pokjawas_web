import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import Swal from "sweetalert2";


import {
  Search,
  Plus,
  SlidersHorizontal,
  Pencil,
  Trash2,
  Eye
} from "lucide-react";

export default function Index({ laporans = [] }) {

  const { props } = usePage();
  const authUser = props.auth?.user;

  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("terbaru");
  const [search, setSearch] = useState("");

  
  const filteredLaporans = [...laporans]
    .filter((item) =>
      item.title?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) => {
      if (filter === "hari_ini") {
        const today = new Date().toDateString();
        return new Date(item.created_at).toDateString() === today;
      }
      return true;
    })
    .sort((a, b) => {
      if (filter === "terlama") {
        return new Date(a.created_at) - new Date(b.created_at);
      }
      return new Date(b.created_at) - new Date(a.created_at);
    });

  return (
    <UserLayout title="Laporan">

      {/* SEARCH + ACTION */}
      <div className="flex justify-between items-center mb-8">

        {/* SEARCH */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* ACTION */}
        <div className="flex gap-3 relative">

          {/* TAMBAH */}
          <button
            onClick={() => router.get('/user/laporan/create')}
            className="w-10 h-10 flex items-center justify-center border rounded-xl hover:bg-gray-100 transition"
          >
            <Plus size={18} />
          </button>

          {/* FILTER */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="w-10 h-10 flex items-center justify-center border rounded-xl hover:bg-gray-100 transition"
          >
            <SlidersHorizontal size={18} />
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

            return (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white px-5 py-4 rounded-2xl shadow-sm hover:shadow-md transition"
              >

                {/* LEFT */}
                <div className="flex items-center gap-4">

                  {/* AVATAR USER LOGIN */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center text-sm font-semibold">
                    {authUser?.avatar ? (
                      <img
                        src={`/storage/${authUser.avatar}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      authUser?.name?.charAt(0)?.toUpperCase() || "U"
                    )}
                  </div>

                  {/* TEXT */}
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">
                      {authUser?.name || "User"}
                    </p>

                    <p className="text-sm text-gray-400">
                      {item.title}
                    </p>
                  </div>

                </div>

                {/* RIGHT ICON */}
                <div className="flex items-center gap-4">

                  {/* VIEW */}
                  <button
                    onClick={() => router.get(`/user/laporan/${item.id}`)}
                    className="text-gray-500 hover:text-blue-500 hover:scale-110 transition"
                  >
                    <Eye size={20} />
                  </button>

                  {/* EDIT */}
                  <button
                    onClick={() => router.get(`/user/laporan/${item.id}/edit`)}
                    className="text-yellow-500 hover:scale-110 transition"
                  >
                    <Pencil size={20} />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "Yakin mau hapus?",
                        text: "Data tidak bisa dikembalikan!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        confirmButtonText: "Hapus",
                        cancelButtonText: "Batal"
                      }).then((result) => {
                        if (result.isConfirmed) {
                          router.delete(`/user/laporan/${item.id}`);

                          Swal.fire(
                            "Terhapus!",
                            "Laporan berhasil dihapus",
                            "success"
                          );
                        }
                      });
                    }}
                    className="text-red-500 hover:scale-110 transition"
                  >
                    <Trash2 size={20} />
                  </button>

                </div>

              </div>
            );
          })
        )}

      </div>

    </UserLayout>
  );
}