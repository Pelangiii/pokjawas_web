import React from "react";

export default function Profile({ user }) {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="bg-white p-5 rounded shadow w-96">
        <p><b>Nama:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>
      </div>
    </div>
  );
}