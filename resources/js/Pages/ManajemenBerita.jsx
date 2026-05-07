import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import { Search, Plus, Edit3, Trash2, Newspaper } from "lucide-react";

export default function ManajemenBerita({ berita = [] }) {
    const { props, url } = usePage();
    const userAuth = props.auth?.user;

    const handleDelete = (id) => {
        if (confirm('Yakin mau hapus berita ini?')) {
            router.delete(`/berita/${id}`); // Sesuaikan dengan route di web.php kamu
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F4F6FA] font-sans text-gray-900">
            <Head title="Manajemen Berita" />
            
            {/* Sidebar Modular kita */}
            <Sidebar url={url} />

            <main className="flex-1 ml-64">
                {/* --- NAVBAR --- */}
                <div className="flex justify-between items-center px-8 py-6 bg-white border-b sticky top-0 z-40 shadow-sm">
                    <h1 className="text-3xl font-black text-gray-800 tracking-tight">Manajemen Berita</h1>
                    <div className="flex items-center gap-6 text-right">
                        <div>
                            <p className="text-sm font-bold">{userAuth?.name || "Admin"}</p>
                            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest leading-none">Administrator</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-green-700 text-white flex items-center justify-center font-bold">
                            {userAuth?.name?.charAt(0) || "A"}
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    {/* --- SEARCH & ACTION --- */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="relative w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Cari judul berita..." 
                                className="w-full bg-white border-none rounded-2xl pl-12 py-3 font-bold shadow-sm focus:ring-2 focus:ring-green-800" 
                            />
                        </div>
                        <Link 
                            href="/admin/berita/tambah" 
                            className="bg-green-800 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:bg-green-900 transition"
                        >
                            <Plus size={18} /> Tambah Berita
                        </Link>
                    </div>

                    {/* --- GRID BERITA --- */}
                    {berita.length === 0 ? (
                        <div className="text-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
                            <Newspaper className="mx-auto text-gray-200 mb-4" size={64} />
                            <p className="text-gray-400 font-bold">Belum ada berita yang diterbitkan.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {berita.map((item) => (
                                <div key={item.id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-50 hover:shadow-xl transition-all duration-300 group">
                                    <div className="relative h-48 mb-4 overflow-hidden rounded-[1.5rem]">
                                        <img 
                                            src={item.gambar ? `/storage/${item.gambar}` : 'https://placehold.co/600x400?text=No+Image'} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                            alt={item.judul}
                                        />
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full">
                                            <p className="text-[10px] font-black text-green-700 uppercase tracking-widest">{item.kategori}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-gray-800 line-clamp-2 leading-tight h-10">{item.judul}</h3>
                                        </div>
                                        <p className="text-gray-400 text-xs line-clamp-2">{item.isi}</p>
                                        
                                        <div className="pt-4 flex justify-between items-center border-t border-gray-50">
                                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">{item.created_at}</span>
                                            <div className="flex gap-1">
                                                <Link href={`/admin/berita/${item.id}/edit`} className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition">
                                                    <Edit3 size={18} />
                                                </Link>
                                                <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}