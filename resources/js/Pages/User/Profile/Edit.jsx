import React, { useState } from "react";
import { router } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

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

      <div className="bg-white p-8 rounded-2xl shadow max-w-2xl">

        <form onSubmit={submit} className="flex flex-col gap-5">

          {/* FOTO */}
          <label className="w-32 h-32 border rounded-full overflow-hidden cursor-pointer">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover"/>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Upload
              </div>
            )}
            <input type="file" className="hidden" onChange={handleImage}/>
          </label>

          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Nama" className="border px-4 py-2 rounded-xl"/>

          <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="No HP" className="border px-4 py-2 rounded-xl"/>

          <input type="text" value={nip} onChange={(e)=>setNip(e.target.value)} placeholder="NIP" className="border px-4 py-2 rounded-xl"/>

          <input type="date" value={birthDate} onChange={(e)=>setBirthDate(e.target.value)} className="border px-4 py-2 rounded-xl"/>

          <textarea value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Alamat" className="border px-4 py-2 rounded-xl"/>

          <button className="bg-green-700 text-white py-2 rounded-xl">
            Simpan
          </button>

        </form>

      </div>

    </UserLayout>
  );
}