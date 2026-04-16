import { Head, useForm, Link } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function TambahBerita() {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        judul: '',
        kategori: '',
        isi: '',
        gambar: null,
    });

    const submit = (e) => {
        e.preventDefault();
        // Ngirim data ke route /berita
        post('/berita', {
            forceFormData: true,
            onSuccess: () => alert('Berita Berhasil Dibuat!'),
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center font-sans">
            <Head title="Tambah Berita" />
            
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl w-full max-w-xl">
                <Link href="/manajemen" className="text-gray-400 text-sm mb-4 block">← Kembali ke Manajemen</Link>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Buat Berita Baru</h2>

                <form onSubmit={submit} className="space-y-4">
                    {/* Upload Gambar */}
                    <div 
                        onClick={() => fileInputRef.current.click()} 
                        className="w-full h-44 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer overflow-hidden hover:bg-gray-100 transition"
                    >
                        {preview ? (
                            <img src={preview} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-400">Klik untuk upload gambar</span>
                        )}
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        onChange={(e) => {
                            setData('gambar', e.target.files[0]);
                            setPreview(URL.createObjectURL(e.target.files[0]));
                        }} 
                    />

                    {/* Input Judul */}
                    <input 
                        type="text" 
                        placeholder="Judul Berita" 
                        className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-emerald-500"
                        onChange={e => setData('judul', e.target.value)}
                    />

                    {/* Pilih Kategori */}
                    <select 
                        className="w-full bg-gray-50 border-none rounded-xl p-4 text-gray-500 focus:ring-2 focus:ring-emerald-500"
                        onChange={e => setData('kategori', e.target.value)}
                    >
                        <option value="">Pilih Kategori</option>
                        <option value="Agama">Agama</option>
                        <option value="Politik">Politik</option>
                        <option value="Pendidikan">Pendidikan</option>
                    </select>

                    {/* Isi Berita */}
                    <textarea 
                        placeholder="Tulis berita di sini..." 
                        rows="5" 
                        className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-emerald-500"
                        onChange={e => setData('isi', e.target.value)}
                    ></textarea>

                    {/* Tombol Simpan */}
                    <button 
                        disabled={processing} 
                        className="w-full bg-emerald-900 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-900/20 hover:bg-emerald-800 transition"
                    >
                        {processing ? 'Sedang Menyimpan...' : 'Simpan Berita'}
                    </button>
                </form>
            </div>
        </div>
    );
}