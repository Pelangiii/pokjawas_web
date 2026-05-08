import React from "react";
import { Head, router } from "@inertiajs/react";
import { ChevronLeft, User, Mail, Phone, Hash, Calendar, MapPin, Edit } from "lucide-react";

export default function AdminProfile({ user }) {
  // Hanya UI Formatting untuk tanggal
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex min-h-screen bg-[#F4F6FA] font-sans text-gray-900">
      <Head title="Admin Profile" />

      {/* --- ASUMSI SIDEBAR TETAP ADA DI DASHBOARD --- */}
      {/* Jika ini diletakkan di dalam Admin Layout, sidebar biasanya sudah otomatis ada */}

      <main className="flex-1 ml-64">
        {/* HEADER DASHBOARD STYLE */}
        <div className="flex justify-between items-center px-8 py-6 bg-white border-b sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-100 rounded-xl transition"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-2xl font-black text-gray-800">Profil Admin</h1>
          </div>
        </div>

        <div className="p-8 flex justify-center">
          {/* CARD UTAMA */}
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            
            {/* TOP DECORATION AREA (Banner style) */}
            <div className="h-32 bg-green-800 w-full"></div>

            <div className="px-10 pb-10">
              {/* AVATAR SECTION */}
              <div className="relative -mt-16 flex flex-col items-center mb-8">
                <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-white shadow-lg bg-white">
                  {user?.avatar ? (
                    <img
                      src={`/storage/${user.avatar}`}
                      className="w-full h-full object-cover"
                      alt="Avatar"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-700 text-4xl font-black">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    Administrator
                  </span>
                </div>
              </div>

              {/* INFO GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* EMAIL */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                    <Mail size={14} /> Email Address
                  </label>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-gray-700 font-medium">
                    {user?.email || "-"}
                  </div>
                </div>

                {/* NIP */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                    <Hash size={14} /> NIP (Nomor Induk Pegawai)
                  </label>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-gray-700 font-medium">
                    {user?.nip || "-"}
                  </div>
                </div>

                {/* NO HP */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                    <Phone size={14} /> WhatsApp / No. HP
                  </label>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-gray-700 font-medium">
                    {user?.phone || "-"}
                  </div>
                </div>

                {/* TANGGAL LAHIR */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                    <Calendar size={14} /> Tanggal Lahir
                  </label>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-gray-700 font-medium">
                    {formatDate(user?.birth_date)}
                  </div>
                </div>

                {/* ALAMAT */}
                <div className="space-y-2 md:col-span-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                    <MapPin size={14} /> Alamat Lengkap
                  </label>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-gray-700 font-medium leading-relaxed">
                    {user?.address || "Alamat belum diatur."}
                  </div>
                </div>

              </div>

              {/* FOOTER BUTTONS */}
              <div className="flex justify-end gap-4 mt-10 pt-8 border-t border-gray-50">
                <button
                  onClick={() => router.get('/admin/profile/edit')}
                  className="flex items-center gap-2 bg-green-800 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-green-800/20 hover:bg-green-900 transition active:scale-95"
                >
                  <Edit size={18} /> Edit Data Profil
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}