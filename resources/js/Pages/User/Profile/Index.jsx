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

      <div className="bg-[#F5F7FB] min-h-screen flex justify-center pt-16 px-6">

        <div className="bg-white w-full max-w-3xl rounded-3xl p-10 shadow-sm animate-fadeIn">

          <div className="flex flex-col items-center mb-8">

            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-300">
              {user.avatar ? (
                <img src={`/storage/${user.avatar}`} className="w-full h-full object-cover"/>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-4xl">
                  {user.name?.charAt(0)?.toUpperCase()}
                </div>
              )}
            </div>

            <h2 className="text-3xl font-semibold mt-4">{user.name}</h2>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <input value={user.phone || "-"} readOnly className="input bg-gray-50"/>
            <input value={user.address || "-"} readOnly className="input bg-gray-50"/>
            <input value={user.nip || "-"} readOnly className="input bg-gray-50"/>
            <input value={formatDate(user.birth_date)} readOnly className="input bg-gray-50"/>
          </div>

          <div className="flex justify-between mt-10">
            <button onClick={()=>window.history.back()} className="btn">
              Kembali
            </button>

            <button onClick={()=>router.get('/user/profile/edit')} className="btn-primary">
              Edit Profile
            </button>
          </div>

        </div>
      </div>
    </UserLayout>
  );
}