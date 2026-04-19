import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
    

export default function Index() {
    const kegiatan = [1, 2, 3, 4, 5, 6];

    useEffect(() => {
        const elements = document.querySelectorAll(".reveal");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            },
            { threshold: 0.15 }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Head title="Kegiatan" />

            <section className="pb-16 bg-gray-100 min-h-screen overflow-hidden relative font-jakarta">
                {/* TOP BAR */}
                <div className="bg-green-800 text-white flex items-center">
                    <div className="relative bg-yellow-400 px-6 py-2 font-semibold text-white">
                        Media Sosial
                        <div className="absolute top-0 right-[-20px] w-0 h-0 border-t-[40px] border-t-yellow-400 border-r-[20px] border-r-transparent"></div>
                    </div>

                    <div className="flex-1 flex justify-center gap-40">
                        <a href="#"><img src="/images/instagram_logo.svg" className="w-5 h-5" /></a>
                        <a href="#"><img src="/images/youtube_logo.svg" className="w-5 h-5" /></a>
                        <a href="#"><img src="/images/x_logo.svg" className="w-5 h-5" /></a>
                        <a href="#"><img src="/images/facebook_logo.svg" className="w-5 h-5" /></a>
                        <a href="#"><img src="/images/tiktok_logo.svg" className="w-5 h-5" /></a>
                    </div>
                </div>

                {/* NAVBAR */}
                <div className="max-w-7xl mx-auto mt-4 bg-white rounded-xl shadow-md px-6 py-4 relative flex items-center">

                    {/* LOGO */}
                    <div className="flex items-center gap-4 z-10">
                        <img src="/images/logo_kemenag.png" className="w-10 h-10 object-contain" />
                        <div className="w-px h-8 bg-gray-300"></div>
                    </div>

                    {/* MENU */}
                    <div className="absolute left-1/2 -translate-x-1/2 flex gap-20  text-gray-600 font-semibold">
                        <Link href="/" className="hover:text-green-600 transition duration-300">Beranda</Link>
                        <Link href="/struktur" className="hover:text-green-600 transition duration-300">Profil</Link>
                        <Link href="/berita" className="hover:text-green-600 transition duration-300">Berita</Link>
                        <Link href="/kegiatan" className="text-green-600 transition duration-300">Kegiatan</Link>
                    </div>
                </div>

                {/* Background City */}
                    <img
                        src="/images/city_bg.svg"
                        className="absolute bottom-0 left-0 w-full opacity-60 z-0"
                    />

                <div className="max-w-6xl mx-auto px-6 relative z-10 mt-10">

                    
                    {/* TITLE */}
                    <div className="text-center mb-14 relative inline-block w-full reveal">
                        <h2 className="text-3xl font-bold text-gray-800 relative inline-block">
                            Kegiatan Lain Kami

                            <span className="absolute -left-10 top-0 w-6 h-6 border-l-4 border-t-4 border-green-800"></span>
                            <span className="absolute -right-10 bottom-0 w-6 h-6 border-r-4 border-b-4 border-green-800"></span>
                        </h2>
                    </div>

                    {/* GRID */}
                    <div className="grid md:grid-cols-3 gap-8 reveal">

                        {kegiatan.map((item) => (
                            <div key={item} className="bg-white rounded-2xl shadow-md overflow-hidden group">

                                {/* IMAGE */}
                                <div className="relative overflow-hidden">
                                    <img
                                        src={`/images/img_hero_${(item % 3) + 1}.png`}
                                        className="w-full h-48 object-cover transition duration-500 group-hover:scale-110"
                                    />

                                    {/* LINK KE DETAIL */}
                                    <Link
                                        href={`/kegiatan/${item}`}
                                        className="absolute top-3 right-3 bg-green-800 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg hover:scale-110 transition"
                                    >
                                        ↗
                                    </Link>
                                </div>

                                {/* TEXT */}
                                <div className="p-5">
                                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                                        Judul Kegiatan {item}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                                    </p>
                                </div>

                            </div>
                        ))}

                    </div>

                </div>

                {/* Footer */}
                    <section className="relative pt-40 pb-20 flex justify-center mt-52">
      
                    {/* Gradient background */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] h-[150%] 
                        bg-gradient-to-t 
                        from-green-800/80 
                        via-green-700/40 
                        to-transparent 
                        rounded-2xl">
                    </div>

                    {/* Footer Card */}
                    <div className="relative bg-white w-[85%] max-w-6xl rounded-2xl shadow-md p-10">
                        
                        <div className="flex flex-col md:flex-row justify-between gap-10">
                        
                        {/* Kiri */}
                        <div className="max-w-sm space-y-4">
                            <img 
                            src="/images/logo_kemenag.png" 
                            alt="Kemenag" 
                            className="h-10"
                            />

                            <p className="text-sm text-gray-600">
                            Silakan masukkan email Anda untuk menyampaikan pengaduan atau aspirasi.
                            </p>

                            {/* Form Email */}
                            <div class="border border-gray-300 rounded-lg p-1 flex items-center gap-2 max-w-xs">
                            <input 
                            type="email"
                            placeholder="Masukkan Email"
                            class="flex-1 px-3 py-2 text-sm outline-none focus:outline-none focus:ring-0 border-none"
                            />
                            <button class="bg-green-800 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700">
                            Enter
                            </button>
                        </div>

                            <p className="text-xs text-gray-500">
                            Dengan mengirimkan email, Anda menyetujui kebijakan privasi kami dan bersedia menerima informasi terkait tindak lanjut pengaduan.
                            </p>
                        </div>

                        {/* Kanan */}
                        <div className="flex gap-10 md:gap-16 text-right">
                            
                            {/* Navigasi */}
                            <div>
                            <h3 className="text-gray-500 font-semibold mb-3">Navigasi</h3>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><a href="#" className="hover:text-green-700">Beranda</a></li>
                                <li><a href="#" className="hover:text-green-700">Profil</a></li>
                                <li><a href="#" className="hover:text-green-700">Berita</a></li>
                                <li><a href="#" className="hover:text-green-700">Galeri</a></li>
                            </ul>
                            </div>

                            {/* Media Sosial */}
                            <div>
                            <h3 className="text-gray-500 font-semibold mb-3">Media Sosial</h3>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><a href="#" className="hover:text-green-700">Instagram</a></li>
                                <li><a href="#" className="hover:text-green-700">Youtube</a></li>
                                <li><a href="#" className="hover:text-green-700">Facebook</a></li>
                                <li><a href="#" className="hover:text-green-700">Tiktok</a></li>
                            </ul>
                            </div>

                            {/* Kontak */}
                            <div className="max-w-xs">
                            <h3 className="text-gray-500 font-semibold mb-3">Kontak</h3>
                            <p className="text-sm text-gray-500">
                                Alamat : Jln. M. Atik Soeradi Pusat Pemerintahan Kabupaten Tangerang, Tigaraksa - 15720
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Email : kabtangerang@kemenag.go.id
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                No. Telepon :
                            </p>
                            </div>

                        </div>
                        </div>

                        {/* Bottom */}
                        <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500">
                        © 2026 Kementerian Agama Kabupaten Tangerang. All Rights Reserved.
                        </div>

                    </div>
                    </section>
            </section>
        </>
    );
}