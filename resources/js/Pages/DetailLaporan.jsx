import { Head, Link, usePage, router } from '@inertiajs/react'; // FIX: Pakai router bawaan buat kirim aksi instan
import Sidebar from '@/Components/Sidebar';

export default function DetailLaporan({ laporan }) {
    const { auth } = usePage().props;
    const user = auth?.user;

   const handleStatusUpdate = (statusAksi) => {
    // statusAksi nilainya bisa 'revisi' atau 'diterima'
    const label = statusAksi === 'diterima' ? 'DITERIMA' : 'REVISI';

    if (confirm(`Apakah Anda yakin ingin mengubah status laporan menjadi ${label}?`)) {
        router.patch(
            `/admin/verifikasilaporan/status`, 
            { 
                id: laporan?.id, // Kirim ID laporan biar backend tahu mana yang di-update
                status: statusAksi 
            },
            {
                onSuccess: () => {
                    console.log('Status berhasil diperbarui!');
                    
                    // --- INI KUNCI NYA ---
                    // Begitu sukses, langsung tendang user balik ke halaman verifikasi laporan
                    router.visit('/admin/verifikasilaporan');
                },
                onError: (errors) => {
                    console.error('Gagal memperbarui status:', errors);
                    alert('Gagal memperbarui status, silakan coba lagi.');
                }
            }
        );
    }
};

    const formatTanggal = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? '-' : date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Mengamankan URL Gambar
    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        }
        return `/storage/${imagePath}`;
    };

    return (
        <div className="flex min-h-screen bg-[#F8F9FA] font-sans">
            <Head title="Detail Laporan" />
            
            <Sidebar />

            <main className="flex-1 p-8">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-black text-gray-800">Detail Laporan</h1>

                    {/* PROFILE */}
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-bold text-gray-800 leading-none">
                                {user?.name || 'Leon scott'}
                            </p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                {user?.role || 'ADMIN'}
                            </p>
                        </div>
                        <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center font-bold text-gray-600 uppercase">
                            {user?.name ? user.name.charAt(0) : 'L'}
                        </div>
                    </div>
                </div>

                {/* CARD UTAMA */}
                <div className="bg-white rounded-[2rem] p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] relative max-w-4xl mx-auto">
                    
                    {/* CLOSE BUTTON */}
                    <Link
                        href="/admin/verifikasilaporan"
                        className="absolute top-6 left-6 text-xl text-gray-400 hover:text-gray-700 transition"
                    >
                        ✖
                    </Link>

                    {/* IMAGE PREVIEW */}
                    <div className="flex justify-center mb-8 mt-4">
                        <div className="w-[500px] h-[250px] bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center">
                            {laporan?.image ? (
                                <img
                                    src={getImageUrl(laporan.image)}
                                    className="w-full h-full object-cover"
                                    alt="Bukti Kegiatan"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://placehold.co/600x400?text=Gambar+Gagal+Dimuat';
                                    }}
                                />
                            ) : (
                                <div className="text-gray-400 font-medium text-sm">No Image Available</div>
                            )}
                        </div>
                    </div>

                    {/* DETAIL DATA */}
                    <div className="text-sm text-gray-700 space-y-4 max-w-2xl mx-auto px-4">
                        <div className="grid grid-cols-[130px_1fr_1fr] items-start gap-1">
                            <span className="font-bold text-gray-800">Nama Pegawai</span>
                            <span className="text-gray-400">:</span>
                            <span className="text-gray-600">{laporan?.user?.name || '-'}</span>
                        </div>

                        <div className="grid grid-cols-[130px_1fr_1fr] items-start gap-1">
                            <span className="font-bold text-gray-800">Kegiatan</span>
                            <span className="text-gray-400">:</span>
                            <span className="text-gray-600">{laporan?.title || '-'}</span>
                        </div>

                        <div className="grid grid-cols-[130px_1fr_1fr] items-start gap-1">
                            <span className="font-bold text-gray-800">Tanggal</span>
                            <span className="text-gray-400">:</span>
                            <span className="text-gray-600">{formatTanggal(laporan?.created_at)}</span>
                        </div>

                        <div className="grid grid-cols-[130px_1fr_1fr] items-start gap-1">
                            <span className="font-bold text-gray-800">Deskripsi</span>
                            <span className="text-gray-400">:</span>
                            <span className="text-gray-600 leading-relaxed whitespace-pre-line">
                                {laporan?.description || '-'}
                            </span>
                        </div>
                    </div>

                    {/* ACTION BUTTONS (REVISI / DITERIMA) */}
                    <div className="flex justify-end gap-4 mt-12 border-t pt-6">
                        <button
                            onClick={() => handleUpdate(laporan?.id, 'diterima')}
                            className="px-8 py-2 bg-[#801B1B] text-white text-xs font-bold rounded-lg hover:bg-red-900 transition shadow-sm"
                        >
                            Revisi
                        </button>
                        <button
                            onClick={() => handleUpdate(laporan?.id, 'ditolak')}
                            className="px-8 py-2 bg-[#43936C] text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition shadow-sm"
                        >
                            Diterima
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
}