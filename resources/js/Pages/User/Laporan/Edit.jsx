import React, { useState } from "react";
import { router } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

export default function Edit({ laporan }) {
  const [title, setTitle] = useState(laporan.title || "");
  const [date, setDate] = useState(laporan.date || "");
  const [desc, setDesc] = useState(laporan.description || "");

  const submit = (e) => {
    e.preventDefault();

    router.put(`/user/laporan/${laporan.id}`, {
      title,
      date,
      description: desc,
    });
  };

  return (
    <UserLayout title="Edit Laporan">

      <div className="flex justify-center items-center min-h-[80vh] p-6">
        
        <div className="bg-white rounded-2xl shadow border p-10 w-full max-w-4xl relative">

          {/* CLOSE */}
          <button
            onClick={() => window.history.back()}
            className="absolute top-5 left-5 text-2xl font-bold"
          >
            ✖
          </button>

          {/* FORM */}
          <form onSubmit={submit} className="flex flex-col items-center">

            {/* IMAGE */}
            <div className="w-80 h-48 border rounded-xl flex items-center justify-center mb-8 bg-gray-100">
              <span className="text-gray-400">Preview Gambar</span>
            </div>

            {/* INPUT */}
            <div className="w-full max-w-2xl space-y-5">

              {/* TITLE */}
              <input
                type="text"
                placeholder="Judul"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-green-600"
              />

              {/* DATE */}
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-green-600"
              />

              {/* DESCRIPTION */}
              <textarea
                placeholder="Deskripsi"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows="6"
                className="w-full border px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-green-600"
              />

            </div>

            {/* BUTTON */}
            <div className="w-full max-w-2xl flex justify-end mt-8">
              <button
                type="submit"
                className="bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-800 transition"
              >
                Simpan Perubahan
              </button>
            </div>

          </form>

        </div>

      </div>

    </UserLayout>
  );
}