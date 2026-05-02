import { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import { Pencil, Plus, Search, Trash, Filter } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Berita({ berita = [] }) {   // ← ganti nama fungsi

    const { auth } = usePage().props;
    const user = auth.user;

    const [showFilter, setShowFilter] = useState(false);

    const applyFilter = (type) => {
        router.get('/berita', { filter: type }, {   // ← /berita, bukan /manajemen
            preserveState: true,
            replace: true
        });
        setShowFilter(false);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Yakin mau di hapus?',
            text: 'Data yang dihapus tidak bisa dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#9ca3af',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/berita/${id}`, {
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Berhasil!',
                            text: 'Berita berhasil dihapus.',
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false
                        });
                    }
                });
            }
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            <Head title="Daftar Berita" />   {/* ganti judul biar sesuai */}
            <Sidebar />

            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                        Daftar Berita
                    </h1>
                    {/* ... user info tetap sama ... */}
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-bold text-gray-800 leading-none">
                                {user?.name || 'User'}
                            </p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">
                                {user?.role || 'Admin'}
                            </p>
                        </div>
                        <div className="w-10 h-10 bg-gray-300 rounded-xl flex items-center justify-center font-bold text-gray-600">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                    </div>
                </div>

                {/* search + tombol tambah + filter */}
                <div className="flex justify-between mb-8 items-center">
                    <div className="relative w-1/3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="Search" className="border-none shadow-sm pl-10 pr-4 py-2 rounded-xl w-full focus:ring-2 focus:ring-emerald-500" />
                    </div>

                    <div className="flex gap-2 relative">
                        <Link href="/berita/tambah" className="bg-white border border-gray-200 text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition">
                            <Plus size={18} />
                        </Link>

                        <div className="relative">
                            <button onClick={() => setShowFilter(!showFilter)} className="bg-white border border-gray-200 text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition">
                                <Filter size={18} />
                            </button>
                            {showFilter && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                                    <button onClick={() => applyFilter('hari-ini')} className="w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 hover:text-emerald-600">Hari Ini</button>
                                    <button onClick={() => applyFilter('terbaru')} className="w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 hover:text-emerald-600">Terbaru</button>
                                    <button onClick={() => applyFilter('terlama')} className="w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 hover:text-emerald-600">Terlama</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* list berita */}
                {berita.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                        <p className="text-gray-400">Belum ada berita. Klik "+" untuk menambah.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {berita.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-[2rem] shadow-sm flex gap-4 border hover:shadow-md transition">
                                <div className="w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden border">
                                    {item.gambar ? <img src={`/storage/${item.gambar}`} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200 opacity-20"></div>}
                                </div>
                                <div className="flex flex-col justify-between flex-1">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-sm line-clamp-1">{item.judul}</h3>
                                            <span className="text-[10px] text-gray-400">{item.created_at}</span>
                                        </div>
                                        <p className="text-emerald-500 text-[11px] font-bold uppercase">{item.kategori}</p>
                                        <p className="text-gray-400 text-[11px] line-clamp-2 mt-1">{item.isi}</p>
                                    </div>
                                    <div className="flex justify-end gap-2 mt-2">
                                        <Link href={`/berita/${item.id}/edit`} className="text-amber-500 hover:bg-amber-50 p-2 rounded-lg">
                                            <Pencil size={18} />
                                        </Link>
                                        <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                                            <Trash size={18} />
                                        </button>
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