import React, { useState } from "react";
import { router } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import Swal from "sweetalert2";

export default function Create() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
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
      <div className="bg-[#F5F7FB] min-h-screen p-8">
        <div className="bg-white rounded-2xl shadow p-8 max-w-3xl mx-auto">

          <div className="flex flex-col gap-5">

            <label className="w-72 h-44 border rounded-xl flex items-center justify-center cursor-pointer overflow-hidden">
              {preview ? <img src={preview} className="w-full h-full object-cover"/> : "Upload Gambar"}
              <input type="file" className="hidden" onChange={handleImage}/>
            </label>

            <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Judul" className="border p-3 rounded-xl"/>

            <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Deskripsi" className="border p-3 rounded-xl"/>

            <div className="flex justify-between">
              <button onClick={()=>submit("draft")} className="bg-gray-400 text-white px-5 py-2 rounded">
                Draft
              </button>
              <button onClick={()=>submit("published")} className="bg-green-600 text-white px-5 py-2 rounded">
                Kirim
              </button>
            </div>

          </div>
        </div>
      </div>
    </UserLayout>
  );
}