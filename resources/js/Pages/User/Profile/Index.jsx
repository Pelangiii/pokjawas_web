import React from "react";
import { router } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

export default function Index({ user }) {

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <UserLayout title="Profile">

      <div className="bg-white p-8 rounded-2xl shadow max-w-2xl">

        {/* HEADER */}
        <div className="flex items-center gap-5 mb-8">

          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-2xl font-semibold">
            {user.avatar ? (
              <img
                src={`/storage/${user.avatar}`}
                className="w-full h-full object-cover"
              />
            ) : (
              user.name?.charAt(0)?.toUpperCase()
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
          </div>

        </div>

        {/* DETAIL DATA */}
        <div className="space-y-4 text-sm text-gray-700">

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-500">No HP</span>
            <span>{user.phone || "-"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-500">NIP</span>
            <span>{user.nip || "-"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-500">Tanggal Lahir</span>
            <span>{formatDate(user.birth_date)}</span>
          </div>

          <div className="flex flex-col border-b pb-2">
            <span className="font-medium text-gray-500 mb-1">Alamat</span>
            <span>{user.address || "-"}</span>
          </div>

        </div>

        {/* BUTTON */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => router.get('/user/profile/edit')}
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-xl transition"
          >
            Edit Profile
          </button>
        </div>

      </div>

    </UserLayout>
  );
}