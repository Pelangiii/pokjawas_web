import { Head, useForm, Link } from '@inertiajs/react';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';

export default function TambahBerita() {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        judul: '',
        kategori: '',
        isi: '',
        gambar: null,
    });

    const submit = (e) => {
        e.preventDefault();

        post('/berita', {
            forceFormData: true,

            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Berita berhasil ditambahkan',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });

                reset(); // reset form
                setPreview(null); // hapus preview gambar
            },

            onError: () => {
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Cek kembali input kamu ya',
                    icon: 'error'
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-center font-sans">
            <Head title="Tambah Berita" />
            
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-xl w-full max-w-xl">
                
                <Link href="/manajemen" className="text-gray-400 text-sm mb-4 block">
                    ← Kembali
                </Link>

                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
                    Tambah Berita
                </h2>

                <form onSubmit={submit} className="space-y-4">

                    {/* UPLOAD */}
                    <div 
                        onClick={() => fileInputRef.current.click()} 
                        className="w-full h-40 sm:h-44 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer overflow-hidden hover:bg-gray-100 transition"
                    >
                        {preview ? (
                            <img src={preview} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-400 text-sm">
                                Klik untuk upload gambar
                            </span>
                        )}
                    </div>

                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setData('gambar', file);
                                setPreview(URL.createObjectURL(file));
                            }
                        }} 
                    />

                    {/* JUDUL */}
                    <input 
                        type="text" 
                        placeholder="Judul Berita" 
                        className="w-full bg-gray-50 rounded-xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none"
                        value={data.judul}
                        onChange={e => setData('judul', e.target.value)}
                    />
                    {errors.judul && <p className="text-red-500 text-xs">{errors.judul}</p>}

                    {/* KATEGORI */}
                    <select 
                        className="w-full bg-gray-50 rounded-xl p-4 text-gray-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                        value={data.kategori}
                        onChange={e => setData('kategori', e.target.value)}
                    >
                        <option value="">Pilih Kategori</option>
                        <option value="Agama">Agama</option>
                        <option value="Politik">Politik</option>
                        <option value="Olahraga">Olahraga</option>
                        <option value="Pendidikan">Pendidikan</option>
                        <option value="Teknologi">Teknologi</option>
                    </select>
                    {errors.kategori && <p className="text-red-500 text-xs">{errors.kategori}</p>}

                    {/* ISI */}
                    <textarea 
                        placeholder="Tulis berita di sini..." 
                        rows="5" 
                        className="w-full bg-gray-50 rounded-xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none"
                        value={data.isi}
                        onChange={e => setData('isi', e.target.value)}
                    ></textarea>
                    {errors.isi && <p className="text-red-500 text-xs">{errors.isi}</p>}

                    {/* BUTTON */}
                    <button 
                        disabled={processing} 
                        className="w-full bg-emerald-900 text-white py-3 sm:py-4 rounded-2xl font-bold shadow-lg hover:bg-emerald-800 transition"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Berita'}
                    </button>
                </form>
            </div>
        </div>
    );
}