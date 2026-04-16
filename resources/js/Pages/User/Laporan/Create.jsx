import React, { useState } from "react";
import { router } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

export default function Create() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = (e) => {
    e.preventDefault();

    router.post('/user/laporan', {
      title,
      date,
      desc,
      image
    });
  };

  return (
    <UserLayout title="Tambah Laporan">

      <div className="bg-[#F5F7FB] min-h-screen p-8 ">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Tambah Laporan
        </h1>

        <div className="bg-white rounded-2xl shadow p-8 max-w-3xl relative">

          {/* CLOSE BUTTON */}
          <button
            onClick={() => window.history.back()}
            className="absolute top-5 left-5 text-2xl"
          >
            ✖
          </button>

          <form onSubmit={submit} className="flex flex-col items-center gap-5">

            {/* IMAGE UPLOAD */}
            <label className="w-72 h-44 border-2 border-gray-300 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">Upload Gambar</span>
              )}

              <input
                type="file"
                className="hidden"
                onChange={handleImage}
              />
            </label>

            {/* INPUT JUDUL */}
            <input
              type="text"
              placeholder="Judul"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-700"
            />

            {/* INPUT TANGGAL */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-700"
            />

            {/* TEXTAREA DESKRIPSI */}
            <textarea
              placeholder="Deskripsi"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows="5"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-700"
            />

            {/* BUTTON */}
            <div className="w-full flex justify-end">
              <button className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-xl font-semibold">
                Tambah Laporan
              </button>
            </div>

          </form>

        </div>

      </div>

    </UserLayout>
  );
}