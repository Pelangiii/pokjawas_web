import { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import {
    BellDot,
    Check,
    Eye,
    Mail,
    X,
    Filter,
    Search,
} from 'lucide-react';

export default function VerifikasiLaporan(props) {
    // PENGAMAN 1: Ambil laporans dari props dengan fallback array kosong jika null
    const laporans = props?.laporans || [];
    
    // PENGAMAN 2: Ambil data auth secara super aman
    const auth = usePage()?.props?.auth || {};
    const user = auth?.user || null;

    const [showFilter, setShowFilter] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            // Menggunakan string path mentah jika helper route() bermasalah
            router.get(
                '/admin/verifikasilaporan',
                { search: searchTerm },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }
    };

    const applyFilter = (status) => {
        router.get(
            '/admin/verifikasilaporan',
            { status: status },
            { preserveState: true, preserveScroll: true, replace: true }
        );
        setShowFilter(false);
    };

    const handleUpdate = (id, status) => {
        if (confirm(`Apakah Anda yakin ingin mengubah status laporan ini menjadi ${status}?`)) {
            router.patch(`/admin/verifikasilaporan/${id}/status`, {
                status: status,
            }, { preserveScroll: true });
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F4F6FA] font-sans text-slate-900">
            <Head title="Verifikasi Laporan" />

            {/* SIDEBAR */}
            <Sidebar />

            {/* MAIN */}
            <main className="flex-1 lg:ml-64">
                
                {/* HEADER */}
                <header className="sticky top-0 z-30 bg-white border-b border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center px-4 lg:px-8 py-5">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-black text-slate-800 tracking-tight">
                                Verifikasi Laporan
                            </h1>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4 text-slate-400">
                                <Mail size={20} className="cursor-pointer hover:text-emerald-600 transition" />
                                <div className="relative">
                                    <BellDot size={20} className="cursor-pointer hover:text-emerald-600 transition" />
                                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                                </div>
                            </div>

                            <div className="h-6 w-px bg-slate-200"></div>

                            <div className="flex items-center gap-3 cursor-pointer group">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-slate-800">
                                        {user?.name || 'Admin'}
                                    </p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                        Administrator
                                    </p>
                                </div>
                                <div className="w-10 h-10 bg-emerald-700 text-white rounded-xl flex items-center justify-center font-bold shadow-sm shadow-emerald-200 uppercase">
                                    {user?.name ? user.name.charAt(0) : 'A'}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* CONTENT */}
                <div className="p-4 lg:p-8">

                    {/* SEARCH & FILTER */}
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-8">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleSearch}
                                placeholder="Cari laporan..."
                                className="bg-white border border-slate-100 shadow-sm pl-11 pr-4 py-3 rounded-2xl w-full focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm outline-none"
                            />
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all border
                                ${showFilter ? 'bg-slate-800 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm'}`}
                            >
                                <Filter size={18} />
                                Filter Status
                            </button>

                            {showFilter && (
                                <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                                    <button onClick={() => applyFilter('all')} className="w-full text-left px-5 py-2.5 text-sm hover:bg-slate-50 font-medium transition">Semua Laporan</button>
                                    <button onClick={() => applyFilter('pending')} className="w-full text-left px-5 py-2.5 text-sm hover:bg-amber-50 text-amber-600 font-medium transition">Pending</button>
                                    <button onClick={() => applyFilter('diterima')} className="w-full text-left px-5 py-2.5 text-sm hover:bg-emerald-50 text-emerald-600 font-medium transition">Diterima</button>
                                    <button onClick={() => applyFilter('revisi')} className="w-full text-left px-5 py-2.5 text-sm hover:bg-red-50 text-red-600 font-medium transition">Revisi</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* LIST */}
                    <div className="grid grid-cols-1 gap-4">
                        {laporans.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                                <Search className="mx-auto text-slate-300 mb-4" size={48} />
                                <p className="text-slate-500 font-bold">Data laporan tidak ditemukan.</p>
                            </div>
                        ) : (
                            laporans.map((laporan) => (
                                <div
                                    key={laporan?.id || Math.random()}
                                    className="bg-white p-4 sm:p-5 rounded-[1.8rem] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300"
                                >
                                    {/* LEFT */}
                                    <div className="flex items-center gap-4 mb-4 sm:mb-0 w-full sm:w-auto">
                                        <div className="w-14 h-14 bg-slate-100 rounded-2xl overflow-hidden shadow-inner flex-shrink-0">
                                            <img
                                                src={laporan?.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'}
                                                className="w-full h-full object-cover"
                                                alt="avatar"
                                            />
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="w-[1.5px] h-8 bg-slate-100 hidden sm:block"></div>
                                            <div>
                                                {/* PENGAMAN 3: Menghindari error pembacaan nama properti objek */}
                                                <h3 className="font-bold text-slate-800 text-sm lg:text-base leading-snug">
                                                    {laporan?.judul || laporan?.nama || 'Laporan Tanpa Judul'} 
                                                    <span className="text-xs font-normal text-slate-400 block sm:inline sm:ml-2">
                                                        ({laporan?.user?.name || 'Anonim'})
                                                    </span>
                                                </h3>

                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">
                                                        {laporan?.created_at ? new Date(laporan.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Tanggal -'}
                                                    </span>
                                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                                        laporan?.status === 'diterima' ? 'bg-emerald-50 text-emerald-600' :
                                                        laporan?.status === 'revisi' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                                                    }`}>
                                                        {laporan?.status || 'pending'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ACTION */}
                                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-none border-slate-50">
                                        <div className="flex items-center gap-1 sm:gap-2">
                                            <button
                                                onClick={() => handleUpdate(laporan?.id, 'diterima')}
                                                className="p-2 sm:p-3 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                                                title="Terima Laporan"
                                            >
                                                <Check size={22} strokeWidth={2.5} />
                                            </button>

                                            <button
                                                onClick={() => handleUpdate(laporan?.id, 'revisi')}
                                                className="p-2 sm:p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                title="Minta Revisi"
                                            >
                                                <X size={22} strokeWidth={2.5} />
                                            </button>
                                        </div>

                                        <div className="w-px h-6 bg-slate-200"></div>

                                        <Link
                                            href={`/admin/verifikasilaporan/${laporan?.id}`}
                                            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs hover:bg-emerald-700 hover:text-white transition-all shadow-sm"
                                        >
                                            <Eye size={16} />
                                            Detail
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}