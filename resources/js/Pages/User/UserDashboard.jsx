import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { usePage } from "@inertiajs/react";

export default function UserDashboard({ laporans }) {

  // ✅ PINDAHIN KE DALAM COMPONENT
  const { props } = usePage();
  const user = props.auth?.user;

  const getStatusColor = (status) => {
    if (status === "Diterima") return "bg-green-600";
    if (status === "Revisi") return "bg-red-600";
    return "bg-blue-700";
  };

  return (
    <UserLayout title="Dashboard">

      {/* WELCOME */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-6 rounded-2xl mb-8">
        <h2 className="text-xl font-semibold">
          Selamat Datang {user?.name} 👋
        </h2>
        <p className="text-sm opacity-90">
          Ini adalah ringkasan aktivitas Anda
        </p>
      </div>

      {/* LAPORAN */}
      <div className="bg-white p-6 rounded-2xl border">

        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Laporan Anda</h3>

          <span
            onClick={() => window.location.href = '/user/laporan'}
            className="text-sm text-blue-500 cursor-pointer"
          >
            Selengkapnya...
          </span>
        </div>

        {laporans.length === 0 ? (
          <p className="text-gray-400 text-sm">
            Belum ada laporan
          </p>
        ) : (
          laporans.map((item, index) => (
            <div
              key={index}
              className="flex justify-between p-4 border rounded-xl mb-3"
            >

              <div>
                <p className="font-medium">
                  {item.title}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
              </div>

              <span className={`${getStatusColor(item.status)} text-white px-3 py-1 rounded-full text-sm`}>
                {item.status ?? "Proses"}
              </span>

            </div>
          ))
        )}

      </div>

    </UserLayout>
  );
}