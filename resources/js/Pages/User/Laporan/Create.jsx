import React, { useState } from "react";
import { router } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

export default function Create() {
  const [title, setTitle] = useState("");
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

  // 🔥 KIRIM DATA (DRAFT / PUBLISH)
  const submit = (status) => {
    router.post(
      "/user/laporan",
      {
        title,
        description: desc,
        image,
        status,
      },
      {
        forceFormData: true,
      }
    );
  };

  return (
    <UserLayout title="Tambah Laporan">
      <div className="bg-[#F5F7FB] min-h-screen p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Tambah Laporan
        </h1>

        <div className="bg-white rounded-2xl shadow p-8 max-w-3xl relative">

          {/* CLOSE */}
          <button
            onClick={() => window.history.back()}
            className="absolute top-5 left-5 text-2xl"
          >
            ✖
          </button>

          <div className="flex flex-col items-center gap-5">

            {/* IMAGE */}
            <label className="w-72 h-44 border-2 border-gray-300 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400">Upload Gambar</span>
              )}

              <input type="file" className="hidden" onChange={handleImage} />
            </label>

            {/* TITLE */}
            <input
              type="text"
              placeholder="Judul"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-4 py-3 rounded-xl"
            />

            {/* DATE */}
            <input
              type="date"
              value={new Date().toISOString().split("T")[0]}
              disabled
              className="w-full border px-4 py-3 rounded-xl bg-gray-100"
            />

            {/* DESC */}
            <textarea
              placeholder="Deskripsi"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows="5"
              className="w-full border px-4 py-3 rounded-xl"
            />

            {/* 🔥 BUTTON */}
            <div className="w-full flex justify-between mt-4">

              {/* DRAFT */}
              <button
                onClick={() => submit("draft")}
                className="bg-gray-400 text-white px-6 py-3 rounded-xl"
              >
                Simpan Draft
              </button>

              {/* PUBLISH */}
              <button
                onClick={() => submit("published")}
                className="bg-green-700 text-white px-6 py-3 rounded-xl"
              >
                Kirim Laporan
              </button>

            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}