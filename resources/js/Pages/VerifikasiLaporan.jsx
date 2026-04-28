import { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import { BellDot, Check, Eye, Mail, X, Filter, Search } from 'lucide-react';

export default function VerifikasiLaporan({ laporanData }) {
    const { auth } = usePage().props;
    const user = auth.user;

    // --- STATE LOGIC ---
    const [showFilter, setShowFilter] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Fungsi Search (Trigger pas tekan Enter)
    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            router.get(route('verifikasi.index'), 
                { search: searchTerm }, 
                { preserveState: true, replace: true }
            );
        }
    };

    const applyFilter = (status) => {
        router.get(route('verifikasi.index'), { status: status }, { 
            preserveState: true, 
            replace: true 
        });
        setShowFilter(false);
    };

    const handleUpdate = (id, status) => {
        router.patch(route('verifikasi.update', id), {
            status: status
        });
    };

    return (
        <div className="flex min-h-screen bg-[#F8F9FA] font-sans">
            <Head title="Verifikasi Laporan" />
            <Sidebar />

            <main className="flex-1 p-8">
                
                {/* HEADER */}
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-black text-gray-800 tracking-tight">
                        Verifikasi Laporan
                    </h1>

                    <div className="flex items-center gap-4">
                        <div className="flex gap-4 text-gray-400">
                            <Mail size={18} className="cursor-pointer hover:text-emerald-500 transition" />
                            <BellDot size={18} className="cursor-pointer hover:text-emerald-500 transition" />
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-gray-800 leading-none">{user?.name || 'User'}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">{user?.role || 'Admin'}</p>
                        </div>
                        <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center font-bold text-gray-600 uppercase">
                            {user?.name?.charAt(0)}
                        </div>
                    </div>
                </div>

                {/* SEARCH & FILTER BAR (Sesuai Screenshot) */}
                <div className="flex justify-between items-center mb-8">
                    {/* Input Search */}
                    <div className="relative w-1/3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="border-none shadow-sm pl-10 pr-4 py-2 rounded-xl w-full focus:ring-2 focus:ring-emerald-500" 
                        />
                    </div>
                    {/* Button Filter Status */}
                    <div className="relative">
                        <button 
                            onClick={() => setShowFilter(!showFilter)}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-400 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                        >
                            <Filter size={16} />
                            Filter Status
                        </button>

                        {showFilter && (
                            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                                <button onClick={() => applyFilter('all')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Semua Laporan</button>
                                <button onClick={() => applyFilter('pending')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-amber-600">Pending</button>
                                <button onClick={() => applyFilter('diterima')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-emerald-600">Diterima</button>
                                <button onClick={() => applyFilter('revisi')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600">Revisi</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* LIST LAPORAN */}
                <div className="space-y-4">
                    {laporanData.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-200">
                            <p className="text-gray-400">Data laporan tidak ditemukan.</p>
                        </div>
                    ) : (
                        laporanData.map((laporan) => (
                            <div 
                                key={laporan.id} 
                                className="bg-white p-5 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between border border-gray-50 hover:border-gray-200 transition"
                            >
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-gray-200 rounded-2xl overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-[1.5px] h-10 bg-gray-200"></div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 text-sm">{laporan.nama}</h3>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase">({laporan.tanggal})</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-5">
                                    <span className="text-[11px] text-gray-400 font-bold">{laporan.jam}</span>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => handleUpdate(laporan.id, 'diterima')} className="text-emerald-600 hover:scale-110 transition"><Check size={20} /></button>
                                        <button onClick={() => handleUpdate(laporan.id, 'revisi')} className="text-red-700 hover:scale-110 transition"><X size={20} /></button>
                                        <Link href={route('verifikasi.show', laporan.id)} className="text-blue-500 hover:scale-110 transition"><Eye size={20} /></Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}