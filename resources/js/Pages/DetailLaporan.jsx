import { Head, Link, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';

export default function DetailBerita({ berita }) {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <div className="flex min-h-screen bg-[#F8F9FA] font-sans">
            <Head title="Detail Berita" />
            <Sidebar />

            <main className="flex-1 p-8">
                
                {/* HEADER */}
                <div className="flex justify-between items-center mb-10">
                    
                    <h1 className="text-3xl font-black text-gray-800">
                        Detail Berita
                    </h1>

                    {/* PROFILE */}
                    <div className="flex items-center gap-4">
                        <div className="flex gap-4 text-gray-400">
                            <span>📩</span>
                            <span>🔔</span>
                        </div>

                        <div className="text-right">
                            <p className="text-sm font-bold text-gray-800 leading-none">
                                {user?.name || 'User'}
                            </p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">
                                {user?.role || 'Admin'}
                            </p>
                        </div>

                        <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center font-bold text-gray-600">
                            {user?.name?.charAt(0)}
                        </div>
                    </div>
                </div>

                {/* CARD */}
                <div className="bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] relative">

                    {/* CLOSE */}
                    <Link 
                        href={route('berita.index')} 
                        className="absolute top-6 left-6 text-xl text-gray-400 hover:text-gray-700"
                    >
                        ✖
                    </Link>

                    {/* IMAGE */}
                    <div className="flex justify-center mb-6">
                        <div className="w-[320px] h-[180px] bg-gray-200 rounded-2xl overflow-hidden">
                            {berita.gambar ? (
                                <img 
                                    src={`/storage/${berita.gambar}`} 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}
                        </div>
                    </div>

                    {/* DETAIL */}
                    <div className="text-sm text-gray-700 space-y-2">
                        <p><b>Judul:</b> {berita.judul}</p>
                        <p><b>Kategori:</b> {berita.kategori}</p>
                        <p><b>Tanggal:</b> {berita.tanggal}</p>
                        <p>
                            <b>Isi:</b><br />
                            {berita.isi}
                        </p>
                    </div>

                </div>
            </main>
        </div>
    );
}