import React from "react";
import { router } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

export default function Show({ laporan }) {

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <UserLayout title="Detail Laporan">

      <div className="bg-white rounded-2xl p-6 shadow-sm border">

        {/* CLOSE */}
        <div className="mb-4">
          <button
            onClick={() => router.get('/user/laporan')}
            className="text-2xl font-bold"
          >
            ✖
          </button>
        </div>

        {/* IMAGE */}
        <div className="flex justify-center mb-6">
          <div className="w-[400px] h-[200px] rounded-2xl border overflow-hidden">

            {laporan.image ? (
              <img
                src={`/storage/${laporan.image}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-400">No Image</span>
              </div>
            )}

          </div>
        </div>

        {/* DETAIL */}
        <div className="space-y-3 text-gray-700">

          <div className="flex gap-2">
            <span className="font-semibold w-40">Nama Pegawai :</span>
            <span>Leon Scott</span>
          </div>

          <div className="flex gap-2">
            <span className="font-semibold w-40">Kegiatan :</span>
            <span>{laporan.title}</span>
          </div>

          <div className="flex gap-2">
            <span className="font-semibold w-40">Tanggal :</span>
            <span>{formatDate(laporan.created_at)}</span>
          </div>

          <div className="flex gap-2">
            <span className="font-semibold w-40">Deskripsi :</span>
            <span>{laporan.description || "-"}</span>
          </div>

        </div>

      </div>

    </UserLayout>
  );
}