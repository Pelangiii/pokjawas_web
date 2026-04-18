import React from "react";
import { router } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

export default function Index({ user }) {
  return (
    <UserLayout title="Profile">

      <div className="bg-white p-8 rounded-2xl shadow max-w-2xl">

        <div className="flex items-center gap-5 mb-6">

          <img
            src={user.avatar ? `/storage/${user.avatar}` : "https://via.placeholder.com/100"}
            className="w-20 h-20 rounded-full object-cover"
          />

          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
          </div>

        </div>

        <button
          onClick={() => router.get('/user/profile/edit')}
          className="bg-green-700 text-white px-5 py-2 rounded-xl"
        >
          Edit Profile
        </button>

      </div>

    </UserLayout>
  );
}