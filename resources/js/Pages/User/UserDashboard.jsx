import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { usePage } from "@inertiajs/react";

export default function UserDashboard({ laporans = [] }) {

  const { props } = usePage();
  const user = props.auth?.user;

  // 🔥 STATUS COLOR (SUDAH FIX ALL CASE)
  const getStatusStyle = (status) => {
    const s = (status || "").toLowerCase();

    if (s === "diterima") return "bg-green-600 text-white";
    if (s === "revisi") return "bg-red-600 text-white";
    if (s === "proses") return "bg-blue-700 text-white";
    if (s === "draft") return "bg-yellow-400 text-white";

    return "bg-gray-400 text-white"; // fallback
  };

  // 🔥 FORMAT TEXT BIAR RAPI
  const formatStatus = (status) => {
    if (!status) return "Proses";

    const s = status.toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <UserLayout title="Dashboard">

      {/* 🔥 WELCOME BANNER */}
      <div className="bg-green-800 text-white rounded-2xl p-8 mb-8 shadow-sm">
        <h2 className="text-3xl font-semibold mb-2">
          Selamat Datang, {user?.name} 👋
        </h2>
        <p className="text-sm opacity-90">
          Ini adalah ringkasan aktivitas Anda di Pokjawas Tangerang
        </p>
      </div>

      {/* 🔥 LAPORAN CARD */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Laporan Anda
          </h3>

          <span
            onClick={() => window.location.href = '/user/laporan'}
            className="text-sm text-blue-500 cursor-pointer hover:underline"
          >
            Selengkapnya...
          </span>
        </div>

        {/* LIST */}
        <div className="space-y-4">

          {laporans.length === 0 ? (
            <p className="text-gray-400 text-sm">
              Belum ada laporan
            </p>
          ) : (
            laporans.map((item) => {

              const date = new Date(item.created_at);

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between border rounded-xl px-4 py-3 hover:shadow-sm hover:scale-[1.01] transition"
                >

                  {/* LEFT */}
                  <div className="flex items-center gap-4">

                    {/* IMAGE */}
                    <div className="w-14 h-14 rounded-xl bg-gray-200 flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img
                          src={`/storage/${item.image}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">
                          IMG
                        </span>
                      )}
                    </div>

                    {/* TITLE + DATE */}
                    <div>
                      <p className="font-semibold text-gray-800">
                        {item.title}
                      </p>

                      <p className="text-xs text-gray-400">
                        ({date.toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })})
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-6">

                    {/* 🔥 STATUS */}
                    <span
                      className={`${getStatusStyle(item.status)} px-4 py-1 rounded-full text-sm font-medium`}
                    >
                      {formatStatus(item.status)}
                    </span>

                    {/* TIME */}
                    <span className="text-sm text-gray-500">
                      {date.toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>

                  </div>

                </div>
              );
            })
          )}

        </div>

      </div>

    </UserLayout>
  );
}