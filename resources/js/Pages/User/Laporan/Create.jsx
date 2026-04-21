import React, { useState } from "react";
import { router } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import Swal from "sweetalert2";
import { X, Image as ImageIcon } from "lucide-react";

export default function Create() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [zoom, setZoom] = useState(1);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
      setZoom(1);
    }
  };

  const submit = (status) => {
    Swal.fire({
      title: status === "draft" ? "Simpan sebagai draft?" : "Kirim laporan?",
      text: "Data akan disimpan",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        router.post(
          "/user/laporan",
          { title, description: desc, image, status },
          { forceFormData: true }
        );

        Swal.fire("Berhasil!", "Data tersimpan", "success");
      }
    });
  };

  return (
    <UserLayout title="Tambah Laporan">

      {/* 🔥 FIX POSISI (NAIK KE ATAS) */}
      <div className="bg-[#F5F7FB] min-h-screen flex justify-center pt-16 px-6">

        <div className="bg-white w-full max-w-4xl rounded-3xl p-8 shadow-md relative">

          {/* ❌ CLOSE */}
          <button
            onClick={() => window.history.back()}
            className="absolute top-6 left-6 text-gray-500 hover:text-black transition"
          >
            <X size={28} />
          </button>

          <div className="flex flex-col items-center gap-6 mt-6">

            {/* 🔥 IMAGE UPLOAD */}
            <label className="w-96 h-52 border-2 border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer overflow-hidden relative group">

              {preview ? (
                <img
                  src={preview}
                  style={{ transform: `scale(${zoom})` }}
                  className="w-full h-full object-cover transition duration-300"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <ImageIcon size={40} />
                  <span className="text-sm mt-2">Upload Gambar</span>
                </div>
              )}

              <input
                type="file"
                className="hidden"
                onChange={handleImage}
              />
            </label>

            {/* 🔥 ZOOM */}
            {preview && (
              <input
                type="range"
                min="1"
                max="2"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(e.target.value)}
                className="w-60"
              />
            )}

            {/* 🔥 INPUT */}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
            />

            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Deskripsi"
              rows={6}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none resize-none"
            />

            {/* 🔥 BUTTON */}
            <div className="flex justify-between w-full mt-4">

              <button
                onClick={() => submit("draft")}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-8 py-3 rounded-full font-semibold transition"
              >
                Simpan Draft
              </button>

              <button
                onClick={() => submit("published")}
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full font-semibold transition"
              >
                Tambah Laporan
              </button>

            </div>

          </div>

        </div>
      </div>
    </UserLayout>
  );
}