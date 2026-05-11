import { Head, useForm, Link, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { ChevronLeft, Image as ImageIcon, Save, X } from 'lucide-react'; // Tambah icon biar cakep
import Swal from 'sweetalert2';

export default function EditBerita({ berita }) {
    const [preview, setPreview] = useState(berita.gambar ? `/storage/${berita.gambar}` : null);
    const fileInputRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        judul: berita.judul || '',
        kategori: berita.kategori || '',
        isi: berita.isi || '',
        gambar: null,
        _method: 'PUT',
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
                    showConfirmButton: false,
                    background: '#ffffff',
                });
                router.visit('/berita'); 
            },
            onError: () => {
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Mohon periksa kembali inputan Anda',
                    icon: 'error',
                    background: '#ffffff',
                });
            }
        });
    };

    return (
        // Pakai bg-slate-50 biar nggak kontras banget sama putihnya card
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 lg:p-12 flex justify-center items-start font-sans">
            <Head title="Edit Berita" />
            
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                {/* Header Card */}
                <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <Link 
                            href="/berita" 
                            className="p-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Edit Berita</h2>
                            <p className="text-xs text-slate-400 font-medium">Perbarui informasi artikel Anda</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} className="p-6 lg:p-8 space-y-6">
                    {/* Upload/Preview Gambar */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Gambar Berita</label>
                        <div 
                            onClick={() => fileInputRef.current.click()} 
                            className="relative group w-full h-56 lg:h-64 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-emerald-500 hover:bg-emerald-50/30 transition-all duration-300"
                        >
                            {preview ? (
                                <>
                                    <img src={preview} className="w-full h-full object-cover transition group-hover:scale-105 duration-500" />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-xs font-bold text-slate-700 shadow-sm">
                                            Ganti Gambar
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center">
                                    <div className="mx-auto w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 mb-3">
                                        <ImageIcon size={24} />
                                    </div>
                                    <span className="text-sm text-slate-500 font-medium">Klik untuk upload gambar</span>
                                    <p className="text-[10px] text-slate-400 mt-1">Format: JPG, PNG, WEBP (Max. 2MB)</p>
                                </div>
                            )}
                        </div>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setData('gambar', file);
                                    setPreview(URL.createObjectURL(file));
                                }
                            }} 
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Input Judul */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Judul Berita</label>
                            <input 
                                type="text" 
                                value={data.judul}
                                placeholder="Masukkan judul berita..."
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                                onChange={e => setData('judul', e.target.value)}
                            />
                            {errors.judul && <div className="text-red-500 text-xs mt-1 font-medium">{errors.judul}</div>}
                        </div>

                        {/* Pilih Kategori */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Kategori</label>
                            <select 
                                value={data.kategori}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-slate-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer"
                                onChange={e => setData('kategori', e.target.value)}
                            >
                                <option value="">Pilih Kategori</option>
                                <option value="Agama">Agama</option>
                                <option value="Politik">Politik</option>
                                <option value="Pendidikan">Pendidikan</option>
                                <option value="Olahraga">Olahraga</option>
                                <option value="Teknologi">Teknologi</option>
                            </select>
                        </div>
                    </div>

                    {/* Isi Berita */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Konten Berita</label>
                        <textarea 
                            value={data.isi}
                            rows="6" 
                            placeholder="Tuliskan isi berita di sini..."
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none"
                            onChange={e => setData('isi', e.target.value)}
                        ></textarea>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button 
                            type="submit"
                            disabled={processing} 
                            className="flex-1 bg-emerald-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-700/20 hover:bg-emerald-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            <Save size={18} />
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                        <Link
                            href="/berita"
                            className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all text-center"
                        >
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}