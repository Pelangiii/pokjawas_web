import { Head, useForm, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import Sidebar from '@/Components/Sidebar';

export default function Manajemen({ berita = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const { data, setData, post, reset, processing, errors } = useForm({
        judul: '',
        kategori: '',
        isi: '',
        gambar: null,
    });

    const handleBoxClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('gambar', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        
        post('/berita', {
            preserveScroll: true, // Biar posisi scroll tetap
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
                setPreview(null);
                // Reset form data
                setData({
                    judul: '',
                    kategori: '',
                    isi: '',
                    gambar: null,
                });
            },
            onError: (errors) => {
                console.log('Error:', errors);
            }
        });
    };

    const handleDelete = (id) => {
        if (confirm('Yakin mau hapus berita ini?')) {
            router.delete(`/berita/${id}`, {
                preserveScroll: true,
            });
        }
    };

    // Bersihkan preview URL saat modal ditutup
    useEffect(() => {
        if (!isModalOpen && preview) {
            URL.revokeObjectURL(preview);
            setPreview(null);
        }
    }, [isModalOpen]);

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            <Head title="Manajemen Berita" />
            <Sidebar />

            <main className="flex-1 p-6">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-800">Manajemen Berita</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">
                            Leon Scott <br/>
                            <span className="text-xs text-gray-400">ADMIN</span>
                        </span>
                        <div className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center font-bold">
                            LS
                        </div>
                    </div>
                </div>

                {/* SEARCH + BUTTON */}
                <div className="flex justify-between mb-8">
                    <input 
                        type="text" 
                        placeholder="Cari berita..." 
                        className="border-none shadow-sm px-4 py-2 rounded-lg w-1/3 focus:ring-2 focus:ring-green-500" 
                    />
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition"
                    >
                        + Tambah
                    </button>
                </div>

                {/* GRID BERITA */}
                {berita.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl">
                        <p className="text-gray-400">Belum ada berita. Klik tombol "Tambah" untuk membuat berita pertama!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {berita.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm flex flex-col relative hover:shadow-md transition">
                                <div className="flex gap-4">
                                    {/* GAMBAR */}
                                    <div className="w-24 h-24 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden border border-gray-100">
                                        {item.gambar ? (
                                            <img 
                                                src={`/storage/${item.gambar}`} 
                                                className="w-full h-full object-cover"
                                                alt={item.judul}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-2xl">📷</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* TEXT */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-lg text-gray-800 leading-tight line-clamp-2">
                                                {item.judul}
                                            </h3>
                                            <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                                                {item.created_at}
                                            </span>
                                        </div>
                                        <p className="text-emerald-600 text-xs font-semibold my-1">
                                            {item.kategori || 'Uncategorized'}
                                        </p>
                                        <p className="text-gray-400 text-xs line-clamp-3">
                                            {item.isi}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* ACTION BUTTONS */}
                                <div className="flex justify-end gap-3 mt-4 pt-2 border-t border-gray-100">
                                    <button className="text-orange-400 hover:text-orange-600 transition">
                                        ✏️ Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-500 hover:text-red-700 transition"
                                    >
                                        🗑️ Hapus
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* MODAL TAMBAH BERITA */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
                            <button 
                                onClick={() => { 
                                    setIsModalOpen(false); 
                                    reset();
                                    setPreview(null);
                                }} 
                                className="absolute top-6 left-6 text-2xl font-bold hover:text-red-500 transition"
                            >
                                ✕
                            </button>
                            <h2 className="text-center text-2xl font-bold mb-6 text-gray-700">
                                Tambah Berita Baru
                            </h2>

                            <form onSubmit={submit} className="space-y-4">
                                {/* INPUT FILE TERSEMBUNYI */}
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    onChange={handleFileChange} 
                                    className="hidden" 
                                    accept="image/*"
                                />

                                {/* BOX GAMBAR */}
                                <div 
                                    onClick={handleBoxClick}
                                    className="w-full h-48 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer overflow-hidden hover:bg-gray-200 transition"
                                >
                                    {preview ? (
                                        <img src={preview} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center">
                                            <span className="text-4xl block">🖼️</span>
                                            <span className="text-xs text-gray-400 mt-2 block">Klik untuk upload gambar</span>
                                        </div>
                                    )}
                                </div>
                                {errors.gambar && <p className="text-red-500 text-xs">{errors.gambar}</p>}

                                {/* FORM FIELDS */}
                                <div className="grid grid-cols-2 gap-4">
                                    <input 
                                        type="text" 
                                        placeholder="Judul Berita" 
                                        value={data.judul} 
                                        onChange={e => setData('judul', e.target.value)} 
                                        className="bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-emerald-500"
                                        required 
                                    />
                                    <select 
                                        onChange={e => setData('kategori', e.target.value)} 
                                        value={data.kategori}
                                        className="bg-gray-50 border-none rounded-xl p-3 text-gray-500 focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="">Pilih Kategori</option>
                                        <option value="Politik">Politik</option>
                                        <option value="Olahraga">Olahraga</option>
                                        <option value="Teknologi">Teknologi</option>
                                        <option value="Pendidikan">Pendidikan</option>
                                    </select>
                                </div>

                                <textarea 
                                    placeholder="Isi Berita" 
                                    rows="5" 
                                    value={data.isi} 
                                    onChange={e => setData('isi', e.target.value)} 
                                    className="w-full bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-emerald-500"
                                    required 
                                />

                                {/* ERROR MESSAGES */}
                                {errors.judul && <p className="text-red-500 text-xs">{errors.judul}</p>}
                                {errors.isi && <p className="text-red-500 text-xs">{errors.isi}</p>}

                                {/* SUBMIT BUTTON */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <button 
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-semibold hover:bg-gray-300 transition"
                                    >
                                        Batal
                                    </button>
                                    <button 
                                        type="submit" 
                                        disabled={processing} 
                                        className="bg-emerald-800 text-white px-8 py-2 rounded-xl font-semibold disabled:opacity-50 hover:bg-emerald-700 transition"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}