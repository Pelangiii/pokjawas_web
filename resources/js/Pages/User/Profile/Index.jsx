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

      {/* 🔥 BACKGROUND */}
      <div className="bg-[#F5F7FB] min-h-screen flex justify-center pt-12 px-6">

        {/* 🔥 CARD */}
        <div className="bg-white w-full max-w-4xl rounded-3xl shadow-sm p-10 animate-fadeIn">

          {/* ================= HEADER ================= */}
          <div className="flex flex-col items-center border-b pb-8 mb-8">

            {/* AVATAR */}
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-gray-300 shadow-sm">
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

            {/* NAMA */}
            <h2 className="text-3xl font-semibold text-gray-800 mt-4">
              {user.name}
            </h2>

            {/* EMAIL */}
            <p className="text-gray-400 text-sm">
              {user.email}
            </p>
          </div>

          {/* ================= DATA ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* NO HP */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">No HP</span>
              <div className="bg-gray-50 border rounded-xl px-4 py-3">
                {user.phone || "-"}
              </div>
            </div>

            {/* NIP */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">NIP</span>
              <div className="bg-gray-50 border rounded-xl px-4 py-3">
                {user.nip || "-"}
              </div>
            </div>

            {/* TANGGAL LAHIR */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Tanggal Lahir</span>
              <div className="bg-gray-50 border rounded-xl px-4 py-3">
                {formatDate(user.birth_date)}
              </div>
            </div>

            {/* ALAMAT */}
            <div className="flex flex-col md:col-span-2">
              <span className="text-sm text-gray-500 mb-1">Alamat</span>
              <div className="bg-gray-50 border rounded-xl px-4 py-3">
                {user.address || "-"}
              </div>
            </div>

          </div>

          {/* ================= BUTTON ================= */}
          <div className="flex justify-between mt-10">

            <button
              onClick={() => window.history.back()}
              className="px-8 py-3 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold transition active:scale-95"
            >
              Kembali
            </button>

            <button
              onClick={() => router.get('/user/profile/edit')}
              className="px-8 py-3 rounded-full bg-green-700 hover:bg-green-800 text-white font-semibold transition active:scale-95"
            >
              Edit Profile
            </button>

          </div>

        </div>
      </div>
    </UserLayout>
  );
}