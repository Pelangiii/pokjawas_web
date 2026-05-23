import { Link, Head } from '@inertiajs/react';

<<<<<<< HEAD
export default function Welcome({
    auth = {},
    laravelVersion,
    phpVersion,
}) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');

        document.getElementById('docs-card')?.classList.add('!row-span-1');

        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');

        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />

            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                />

                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">

                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">

                            <div className="flex lg:col-start-2 lg:justify-center">
                                <h1 className="text-3xl font-bold text-black dark:text-white">
                                    Laravel 🔥
                                </h1>
                            </div>

                            <nav className="-mx-3 flex flex-1 justify-end">

                                {auth?.user ? (

                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 dark:text-white"
=======
export default function Welcome(props) {
    // Ambil data kiriman backend dengan metode defensif anti-white-screen
    const canLogin = props?.canLogin ?? false;
    const canRegister = props?.canRegister ?? false;
    const beritas = props?.beritas || [];
    const auth = props?.auth || {};
    const user = auth?.user || null;

    // Fungsi bantu untuk mengarahkan dashboard sesuai role user yang login
    const getDashboardRoute = () => {
        if (!user) return '#';
        // Menggunakan path string mentah jika nama rute ziggy berbeda di proyekmu
        return user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
    };

    return (
        <div className="min-h-screen bg-[#F4F6FA] text-slate-900 font-sans antialiased">
            <Head title="Selamat Datang" />

            {/* NAVBAR */}
            <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center font-black text-white shadow-md shadow-emerald-200">
                            L
                        </div>
                        <span className="font-black text-xl text-slate-800 tracking-tight">Laporgov!</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <Link
                                href={getDashboardRoute()}
                                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-100 hover:bg-emerald-700 transition"
                            >
                                Ke Dashboard ({user.name})
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-5 py-2.5 text-slate-600 hover:text-emerald-600 text-sm font-bold transition"
                                >
                                    Masuk
                                </Link>

                                {canRegister && (
                                    <Link
                                        href="/register"
                                        className="px-5 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-900 transition shadow-sm"
>>>>>>> feature-frontend
                                    >
                                        Daftar
                                    </Link>
<<<<<<< HEAD

                                ) : (

                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 dark:text-white"
                                        >
                                            Log in
                                        </Link>

                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 dark:text-white"
                                        >
                                            Register
                                        </Link>
                                    </>

                                )}

                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">

                                <a
                                    href="https://laravel.com/docs"
                                    id="docs-card"
                                    className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow"
                                >

                                    <div
                                        id="screenshot-container"
                                        className="relative flex w-full flex-1 items-stretch"
                                    >

                                        <img
                                            src="https://laravel.com/assets/img/welcome/docs-light.svg"
                                            alt="Laravel documentation screenshot"
                                            className="aspect-video h-full w-full flex-1 rounded-[10px] object-cover object-top"
                                            onError={handleImageError}
                                        />

                                    </div>

                                    <div className="relative flex items-center gap-6 lg:items-end">

                                        <div
                                            id="docs-card-content"
                                            className="flex items-start gap-6 lg:flex-col"
                                        >

                                            <div className="pt-3 sm:pt-5 lg:pt-0">

                                                <h2 className="text-xl font-semibold text-black dark:text-white">
                                                    Documentation
                                                </h2>

                                                <p className="mt-4 text-sm/relaxed">
                                                    Laravel documentation covering every
                                                    aspect of the framework.
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </a>

                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>

=======
                                )}
                            </>
                        )}
>>>>>>> feature-frontend
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <header className="bg-gradient-to-b from-white to-slate-50 py-20 border-b border-slate-100">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 font-extrabold text-xs uppercase tracking-widest rounded-full">
                        Sistem Portal Berita & Laporan
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-black text-slate-800 tracking-tight mt-6 mb-6 leading-tight">
                        Layanan Transparansi Informasi <br />
                        <span className="text-emerald-600">Terintegrasi Publik</span>
                    </h1>
                    <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        Sampaikan aspirasi Anda dan pantau rilis berita terkini dari administrasi pusat secara berkala demi kemajuan bersama.
                    </p>
                </div>
            </header>

            {/* SECTION DINAMIS: BERITA TERBARU DARI DASHBOARD ADMIN */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-12">
                        <div>
                            <span className="text-xs font-black uppercase text-emerald-600 tracking-widest block mb-1">
                                Update Terkini
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
                                Berita & Pengumuman Terbaru
                            </h2>
                        </div>
                        <p className="text-slate-400 text-sm sm:max-w-xs">
                            Data langsung tersinkronisasi ketika administrator menerbitkan konten di dashboard.
                        </p>
                    </div>

                    {/* GRID DATA LOOPING */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {beritas.length > 0 ? (
                            beritas.map((berita) => (
                                <article 
                                    key={berita?.id || Math.random()} 
                                    className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:border-emerald-100 transition-all duration-300 flex flex-col group cursor-pointer"
                                >
                                    {/* AREA IMAGE */}
                                    <div className="h-52 bg-slate-100 overflow-hidden relative">
                                        <img 
                                            src={berita?.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80'} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                            alt={berita?.judul || 'Rilis Berita'}
                                        />
                                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-800 font-bold text-[10px] rounded-lg shadow-sm">
                                            Info Publik
                                        </div>
                                    </div>

                                    {/* CARD BODY */}
                                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                                        <div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                                                {berita?.created_at ? new Date(berita.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Baru Saja'}
                                            </span>
                                            
                                            <h3 className="font-bold text-slate-800 text-lg lg:text-xl leading-snug group-hover:text-emerald-600 transition-colors mb-3 line-clamp-2">
                                                {berita?.judul || berita?.title || 'Judul Berita'}
                                            </h3>

                                            <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-6">
                                                {berita?.konten || berita?.content || 'Tidak ada deskripsi singkat untuk berita ini.'}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">
                                            <span>Baca Selengkapnya</span>
                                            <span>&rarr;</span>
                                        </div>
                                    </div>
                                </article>
                            ))
                        ) : (
                            /* TAMPILAN JIKA BELUM ADA DATA BERITA DI DATABASE */
                            <div className="col-span-1 md:col-span-3 text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                                <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-2xl">
                                    !
                                </div>
                                <p className="text-slate-600 font-bold text-lg">Belum Ada Berita Utama</p>
                                <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">
                                    Konten pengumuman publik akan tampil otomatis di sini setelah administrator menambahkannya di menu Berita.
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-slate-900 text-slate-500 py-12 text-center text-sm border-t border-slate-800">
                <p>&copy; 2026 Laporgov. All rights reserved.</p>
                <p className="text-[10px] text-slate-700 mt-2">Laravel v{props?.laravelVersion} (PHP v{props?.phpVersion})</p>
            </footer>
        </div>
    );
}