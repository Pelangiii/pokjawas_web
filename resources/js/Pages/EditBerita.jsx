import { Head, useForm, Link, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';

export default function EditBerita({ berita }) {
    // State buat preview gambar lama atau baru
    const [preview, setPreview] = useState(berita.gambar ? `/storage/${berita.gambar}` : null);
    const fileInputRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        judul: berita.judul || '',
        kategori: berita.kategori || '',
        isi: berita.isi || '',
        gambar: null, // Default null, diisi kalau mau ganti gambar aja
        _method: 'PUT', // PENTING: Laravel butuh ini buat spoofing method PUT kalau kirim file lewat POST
    });
    
    const submit = (e) => {
    e.preventDefault();

    post(`/berita/${berita.id}`, {
        forceFormData: true,

        onSuccess: () => {
            Swal.fire({
                title: 'Berhasil!',
                text: 'Berita berhasil diperbarui',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });

            router.visit('/manajemen'); // balik ke list
        },

        onError: () => {
            Swal.fire({
                title: 'Gagal!',
                text: 'Cek input kamu',
                icon: 'error'
            });
        }
    });
};
    return (
        <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center font-sans">
            <Head title="Edit Berita" />
            
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl w-full max-w-xl">
                <Link href="/manajemen" className="text-gray-400 text-sm mb-4 block">← Batal Edit</Link>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Berita</h2>

                <form onSubmit={submit} className="space-y-4">
                    {/* Upload/Preview Gambar */}
                    <div 
                        onClick={() => fileInputRef.current.click()} 
                        className="w-full h-44 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer overflow-hidden hover:bg-gray-100 transition"
                    >
                        {preview ? (
                            <img src={preview} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-400">Klik untuk ganti gambar</span>
                        )}
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setData('gambar', file);
                            setPreview(URL.createObjectURL(file));
                        }} 
                    />

                    {/* Input Judul */}
                    <div>
                        <input 
                            type="text" 
                            value={data.judul}
                            className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-emerald-500"
                            onChange={e => setData('judul', e.target.value)}
                        />
                        {errors.judul && <div className="text-red-500 text-xs mt-1">{errors.judul}</div>}
                    </div>

                    {/* Pilih Kategori */}
                    <select 
                        value={data.kategori}
                        className="w-full bg-gray-50 border-none rounded-xl p-4 text-gray-500 focus:ring-2 focus:ring-emerald-500"
                        onChange={e => setData('kategori', e.target.value)}
                    >
                        <option value="">Pilih Kategori</option>
                        <option value="Agama">Agama</option>
                        <option value="Politik">Politik</option>
                        <option value="Pendidikan">Pendidikan</option>
                        <option value="Olahraga">Olahraga</option>
                        <option value="Teknologi">Teknologi</option>
                    </select>

                    {/* Isi Berita */}
                    <textarea 
                        value={data.isi}
                        rows="5" 
                        className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-emerald-500"
                        onChange={e => setData('isi', e.target.value)}
                    ></textarea>

                    {/* Tombol Simpan */}
                    <button 
                        disabled={processing} 
                        className="w-full  bg-emerald-900 text-white py-4 rounded-2xl font-bold shadow-lg shadow-amber-500/20 shadow-emerald-900/20 hover:bg-emerald-800 transition"
                    >
                        {processing ? 'Sedang Memperbarui...' : 'Simpan Perubahan'}
                    </button>
                </form>
            </div>
        </div>
    );
}