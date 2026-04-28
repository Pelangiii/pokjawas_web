import { Head, Link, router } from '@inertiajs/react'; // Tambah Link buat navigasi antar file
import Sidebar from '@/Components/Sidebar';

export default function Manajemen({ berita = [] }) {
    
    // Fungsi hapus berita
    const handleDelete = (id) => {
        if (confirm('Yakin mau hapus berita ini?')) {
            router.delete(`/berita/${id}`);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            <Head title="Manajemen Berita" />
            <Sidebar />

            <main className="flex-1 p-6">
                {/* --- HEADER --- */}
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Manajemen Berita</h1>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-bold text-gray-800 leading-none">Leon Scott</p>
                            <p className="text-[10px] text-gray-400 font-bold">ADMIN</p>
                        </div>
                        <div className="w-10 h-10 bg-gray-300 rounded-xl flex items-center justify-center font-bold text-gray-600">LS</div>
                    </div>
                </div>

                {/* --- SEARCH + TOMBOL TAMBAH --- */}
                <div className="flex justify-between mb-8 items-center">
                    <div className="relative w-1/3">
                        <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                        <input type="text" placeholder="Search" className="border-none shadow-sm pl-10 pr-4 py-2 rounded-xl w-full focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    
                    <div className="flex gap-2">
                        {/* INI KUNCINYA: Pakai Link buat pindah ke file TambahBerita.jsx */}
                        <Link 
                            href="/berita/tambah" 
                            className="bg-white border border-gray-200 text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition"
                        >
                            ➕
                        </Link>
                    </div>
                </div>

                {/* --- GRID BERITA (Daftar Card) --- */}
                {berita.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                        <p className="text-gray-400">Belum ada berita. Klik "+" untuk menambah.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {berita.map((item, index) => (
                            <div key={item.id} className="bg-white p-4 rounded-[2rem] shadow-sm flex gap-4 border border-gray-50 hover:shadow-md transition relative group">
                                
                                {/* Kotak Gambar (Kiri) */}
                                <div className="w-24 h-24 bg-gray-100 rounded-2xl flex-shrink-0 overflow-hidden border border-gray-200">
                                    {item.gambar ? (
                                        <img src={`/storage/${item.gambar}`} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 opacity-20"></div>
                                    )}
                                </div>
                                
                                {/* Info Teks (Kanan) */}
                                <div className="flex flex-col justify-between flex-1 min-w-0">
                                    <div>
                                        <div className="flex justify-between items-start gap-1">
                                            <h3 className="font-bold text-[15px] text-gray-800 line-clamp-1">{item.judul}</h3>
                                            <span className="text-[10px] text-gray-400 whitespace-nowrap">{item.created_at}</span>
                                        </div>
                                        <p className="text-emerald-500 text-[11px] font-bold uppercase tracking-wider">{item.kategori}</p>
                                        <p className="text-gray-400 text-[11px] line-clamp-2 mt-1">{item.isi}</p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-end gap-2 mt-2">
                                        <button className="text-amber-400 text-sm">✏️</button>
                                        <button onClick={() => handleDelete(item.id)} className="text-red-400 text-sm">🗑️</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}