import { Head, useForm, Link } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { ChevronLeft, Image as ImageIcon, Send, X } from 'lucide-react'; // Tambah icon biar konsisten
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
                    showConfirmButton: false,
                    background: '#ffffff',
                });
                reset(); 
                setPreview(null); 
            },
            onError: () => {
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Cek kembali input kamu ya',
                    icon: 'error',
                    background: '#ffffff',
                });
            }
        });
    };

    return (
        // Pakai bg-slate-50 buat background luar biar card putihnya "pop out"
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 lg:p-12 flex justify-center items-start font-sans">
            <Head title="Tambah Berita" />
            
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                
                {/* HEADER CARD - Konsisten sama Edit Page */}
                <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <Link 
                            href="/berita" 
                            className="p-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Tambah Berita</h2>
                            <p className="text-xs text-slate-400 font-medium">Publikasikan informasi terbaru Anda</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} className="p-6 lg:p-8 space-y-6">

                    {/* UPLOAD BOX - Dibuat lebih interaktif */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Gambar Berita</label>
                        <div 
                            onClick={() => fileInputRef.current.click()} 
                            className="relative group w-full h-56 lg:h-64 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-emerald-500 hover:bg-emerald-50/30 transition-all duration-300"
                        >
                            {preview ? (
                                <div className="relative w-full h-full">
                                    <img src={preview} className="w-full h-full object-cover transition group-hover:scale-105 duration-500" />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-xs font-bold text-slate-700 shadow-sm">
                                            Ganti Gambar
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center p-4">
                                    <div className="mx-auto w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 mb-3 group-hover:text-emerald-500 transition-colors">
                                        <ImageIcon size={24} />
                                    </div>
                                    <span className="text-sm text-slate-500 font-medium">Klik untuk upload gambar</span>
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
                        {errors.gambar && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.gambar}</p>}
                    </div>

                    {/* JUDUL */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Judul Berita</label>
                        <input 
                            type="text" 
                            placeholder="Kegiatan Pokjawas Kemenag Hari Ini" 
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-700"
                            value={data.judul}
                            onChange={e => setData('judul', e.target.value)}
                        />
                        {errors.judul && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.judul}</p>}
                    </div>

                    {/* KATEGORI */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Kategori</label>
                        <div className="relative">
                            <select 
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-slate-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer"
                                value={data.kategori}
                                onChange={e => setData('kategori', e.target.value)}
                            >
                                <option value="">Pilih Kategori Berita</option>
                                <option value="Agama">Agama</option>
                                <option value="Politik">Politik</option>
                                <option value="Olahraga">Olahraga</option>
                                <option value="Pendidikan">Pendidikan</option>
                                <option value="Teknologi">Teknologi</option>
                            </select>
                            {/* Icon Arrow Custom buat Select */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <ChevronLeft size={16} className="-rotate-90" />
                            </div>
                        </div>
                        {errors.kategori && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.kategori}</p>}
                    </div>

                    {/* ISI */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Isi Berita</label>
                        <textarea 
                            placeholder="Tuliskan detail informasi di sini..." 
                            rows="6" 
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-700 resize-none"
                            value={data.isi}
                            onChange={e => setData('isi', e.target.value)}
                        ></textarea>
                        {errors.isi && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.isi}</p>}
                    </div>

                    {/* BUTTON ACTIONS */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button 
                            type="submit"
                            disabled={processing} 
                            className="flex-1 bg-emerald-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-700/20 hover:bg-emerald-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <Send size={18} />
                            {processing ? 'Sedang Memproses...' : 'Publikasikan Berita'}
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