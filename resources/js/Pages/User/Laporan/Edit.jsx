import React, { useState } from "react";
import { router } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

export default function Edit({ laporan }) {
  const [title, setTitle] = useState(laporan.title || "");
  const [desc, setDesc] = useState(laporan.description || "");
  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(
    laporan.image ? `/storage/${laporan.image}` : null
  );

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🔥 SIMPAN FINAL
  const submit = (e) => {
    e.preventDefault();

    router.post(`/user/laporan/${laporan.id}`, {
      _method: "put",
      title,
      description: desc,
      image,
      status: "published", // 🔥 FINAL
    }, {
      forceFormData: true,
    });
  };

  // 🔥 SIMPAN DRAFT
  const saveDraft = () => {
    router.post(`/user/laporan/${laporan.id}`, {
      _method: "put",
      title,
      description: desc,
      image,
      status: "draft", // 🔥 DRAFT
    }, {
      forceFormData: true,
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

          <form onSubmit={submit} className="flex flex-col items-center">

            {/* IMAGE */}
            <label className="w-80 h-48 border rounded-xl flex items-center justify-center mb-8 bg-gray-100 overflow-hidden cursor-pointer">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400">Upload Gambar</span>
              )}

              <input type="file" className="hidden" onChange={handleImage} />
            </label>

            {/* INPUT */}
            <div className="w-full max-w-2xl space-y-5">

              <input
                type="text"
                placeholder="Judul"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border px-5 py-3 rounded-xl"
              />

              <textarea
                placeholder="Deskripsi"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows="6"
                className="w-full border px-5 py-3 rounded-xl"
              />

            </div>

            {/* 🔥 BUTTON */}
            <div className="w-full max-w-2xl flex justify-between mt-8">

              {/* DRAFT */}
              <button
                type="button"
                onClick={saveDraft}
                className="bg-gray-400 text-white px-6 py-3 rounded-xl"
              >
                Simpan Draft
              </button>

              {/* FINAL */}
              <button
                type="submit"
                className="bg-green-700 text-white px-8 py-3 rounded-xl"
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