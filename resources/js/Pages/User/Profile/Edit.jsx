import React, { useState } from "react";
import { router } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import { Image as ImageIcon } from "lucide-react";

export default function Edit({ user }) {

  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [nip, setNip] = useState(user.nip || "");
  const [address, setAddress] = useState(user.address || "");
  const [birthDate, setBirthDate] = useState(user.birth_date || "");
  const [avatar, setAvatar] = useState(null);

  const [preview, setPreview] = useState(
    user.avatar ? `/storage/${user.avatar}` : null
  );

  const handleImage = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = (e) => {
    e.preventDefault();

    router.post('/user/profile', {
      name,
      phone,
      nip,
      address,
      birth_date: birthDate,
      avatar
    });
  };

  return (
    <UserLayout title="Edit Profile">

      {/* 🔥 BACKGROUND */}
      <div className="bg-[#F5F7FB] min-h-screen flex justify-center pt-16 px-6">

        {/* 🔥 CARD */}
        <div className="bg-white w-full max-w-3xl rounded-3xl p-10 shadow-sm">

          <form onSubmit={submit}>

            {/* 🔥 AVATAR */}
            <div className="flex flex-col items-center mb-8">

              <label className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-300 cursor-pointer group relative">

                {preview ? (
                  <img
                    src={preview}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 text-gray-400">
                    <ImageIcon size={32} />
                    <span className="text-sm mt-1">Upload</span>
                  </div>
                )}

                {/* overlay hover */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm transition">
                  Ganti Foto
                </div>

                <input
                  type="file"
                  className="hidden"
                  onChange={handleImage}
                />
              </label>

              {/* 🔥 NAMA BESAR */}
              <h2 className="text-3xl font-semibold text-gray-800 mt-4">
                {name || "User"}
              </h2>

            </div>

            {/* 🔥 FORM GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* NAMA */}
              <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Nama"
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
              />

              {/* NO HP */}
              <input
                type="text"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                placeholder="No HP"
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
              />

              {/* NIP */}
              <input
                type="text"
                value={nip}
                onChange={(e)=>setNip(e.target.value)}
                placeholder="NIP"
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
              />

              {/* TANGGAL LAHIR */}
              <input
                type="date"
                value={birthDate}
                onChange={(e)=>setBirthDate(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
              />

              {/* ALAMAT (FULL WIDTH) */}
              <textarea
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                placeholder="Alamat"
                className="md:col-span-2 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none resize-none"
              />

            </div>

            {/* 🔥 BUTTON */}
            <div className="flex justify-between mt-10">

              {/* KEMBALI */}
              <button
                type="button"
                onClick={() => window.history.back()}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-3 rounded-full font-semibold transition"
              >
                Kembali
              </button>

              {/* SIMPAN */}
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full font-semibold transition"
              >
                Simpan
              </button>

            </div>

          </form>

        </div>
      </div>

    </UserLayout>
  );
}