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

      {/* 🔥 BACKGROUND + CENTER */}
      <div className="bg-[#F5F7FB] min-h-screen flex justify-center pt-16 px-6">

        {/* 🔥 CARD */}
        <div className="bg-white w-full max-w-3xl rounded-3xl p-10 shadow-sm">

          {/* 🔥 AVATAR */}
          <div className="flex flex-col items-center mb-8">

            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-300">
              {user.avatar ? (
                <img
                  src={`/storage/${user.avatar}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-4xl font-semibold">
                  {user.name?.charAt(0)?.toUpperCase()}
                </div>
              )}
            </div>

            {/* 🔥 NAMA */}
            <h2 className="text-3xl font-semibold text-gray-800 mt-4">
              {user.name}
            </h2>

            {/* EMAIL */}
            <p className="text-gray-400 text-sm">
              {user.email}
            </p>
          </div>

          {/* 🔥 GRID DATA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* NO HP */}
            <input
              value={user.phone || "-"}
              readOnly
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50"
            />

            {/* ALAMAT */}
            <input
              value={user.address || "-"}
              readOnly
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50"
            />

            {/* NIP */}
            <input
              value={user.nip || "-"}
              readOnly
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50"
            />

            {/* TANGGAL LAHIR */}
            <input
              value={formatDate(user.birth_date)}
              readOnly
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50"
            />

          </div>

          {/* 🔥 BUTTON */}
          <div className="flex justify-between mt-10">

            {/* KEMBALI */}
            <button
              onClick={() => window.history.back()}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full font-semibold transition"
            >
              Kembali
            </button>

            {/* EDIT */}
            <button
              onClick={() => router.get('/user/profile/edit')}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full font-semibold transition"
            >
              Edit Profile
            </button>

          </div>

        </div>
      </div>

    </UserLayout>
  );
}