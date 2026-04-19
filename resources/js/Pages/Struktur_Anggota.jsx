import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Profil() {
    const [open, setOpen] = useState(null);

    const toggle = (id) => {
        setOpen(open === id ? null : id);
    };

    const dropdownData = [
        {
            id: 1,
            title: "KORD. BID. TK / RA, SD / MI",
            content: [
                "Drs Zaenas Solihin",
                "Yahya, S.Pd.I",
                "H. Misbakhul Munir, M.Pd",
            ],
        },
        {
            id: 2,
            title: "KORD. BID. SMP / MTs",
            content: [
                "Sarun, S.Ag, MM",
                "Dr. Wuliyono, M.Si",
                "Dr. Isep Rusmawan, MM",
            ],
        },
        {
            id: 3,
            title: "KORD. BID. SMA, SMK/MA, MAK",
            content: [
                "Drs. H. Martono",
                "H. Jaenudin, S.Pd, MM",
                "H. Didin Hadiat, M.Pd",
            ],
        },
        {
            id: 4,
            title: "KORD. PENINGKATAN KOMPETENSI",
            content: [
                "Dr. H. Yaya Suhaya, S.Ag. M.Pd.",
                "Drs. Yuhadi, M.Pd.",
                "H. Subandi, M.Pd.",
                "H. Taufik Rahman, MA.",
                "Idris, S.Ag. M.Pd.",
            ],
        },
        {
            id: 5,
            title: "KORD. PROG. LAPORAN & EVALUASI",
            content: [
                "Dr. H. Yaya Suhaya, S.Ag. M.Pd.",
                "Drs. Yuhadi, M.Pd.",
                "H. Subandi, M.Pd.",
                "H. Taufik Rahman, MA.",
                "Idris, S.Ag. M.Pd.",
            ],
        },
        {
            id: 6,
            title: "KORD. BID. KESEJAHTERAAN SOSIAL & HUBUNGAN MASYARAKAT",
            content: [
                "Muhammad Nurdin, S.Ag. M.Pd.",
                "H. Dayat Dania, S.Pd.I. MA.",
                "Atmadi, S.Pd.I. M.Si.",
                "Inzal Zulkarnaen, S.Pd. MM.",
                "Vienta Heryani, M.Pd.",
                "H. Abduh Basyith, S.Pd.I",
                "Drs. Moh Fajeri, M.Si.",
            ],
        },
    ];

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
            <Head title="Profil" />

            <div className="bg-gray-100 min-h-screen font-jakarta">

                {/* TOPBAR */}
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
                    <div className="flex items-center gap-4 z-10">
                        <img src="/images/logo_kemenag.png" className="w-10 h-10 object-contain" />
                        <div className="w-px h-8 bg-gray-300"></div>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 flex gap-20 text-gray-600 font-semibold">
                        <Link href="/" className="hover:text-green-600 transition duration-300">Beranda</Link>
                        <Link href="/struktur" className="text-green-600 transition duration-300">Profil</Link>
                        <Link href="/berita" className="hover:text-green-600 transition duration-300">Berita</Link>
                        <Link href="/kegiatan" className="hover:text-green-600 transition duration-300">Kegiatan</Link>
                    </div>
                </div>

                {/* PROFIL */}
                <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">

                    {/* HEADER */}
                    <div className="text-center mb-12 relative">
                    <h2 className="text-4xl font-bold inline-block relative">
                        Profil
                        <span className="absolute -left-10 top-0 w-6 h-6 border-l-4 border-t-4 border-green-800"></span>
                        <span className="absolute -right-10 bottom-0 w-6 h-6 border-r-4 border-b-4 border-green-800"></span>
                    </h2>
                    </div>

                    {/* CARD */}
                    <div className="bg-white rounded-3xl p-10 max-w-5xl mx-auto shadow-md reveal">

                    <h3 className="text-3xl font-semibold text-center mb-10">
                        Tentang Pokjawas
                    </h3>

                    <img
                        src="/images/img_hero_3.png"
                        className="mx-auto mb-8 rounded-xl"
                    />

                    <p className="text-center leading-8 text-gray-800">
                        Pokjawas (Kelompok Kerja Pengawas) Madrasah/PAI merupakan wadah bagi pengawas untuk meningkatkan kompetensi dan kinerja melalui supervisi akademik dan manajerial. Tugasnya meliputi pembinaan guru dalam proses pembelajaran, evaluasi dan pengembangan kurikulum, serta pendampingan kepala madrasah dalam pengelolaan sekolah.
                    </p>

                    <p className="text-center leading-8 text-gray-800 mt-6">
                        Melalui peran tersebut, Pokjawas berkontribusi dalam menjamin mutu pendidikan, mendorong inovasi pembelajaran, serta memastikan penerapan 8 Standar Nasional Pendidikan di madrasah binaan berjalan dengan baik.
                    </p>

                    </div>

                </div>
                </section>

                {/* VISI MISI SECTION */}
                <section className="relative py-24 bg-gray-100 overflow-hidden font-jakarta">

                    {/* Background City */}
                    <img
                        src="/images/city_bg.svg"
                        className="absolute bottom-0 left-0 w-full opacity-60 z-0"
                    />

                    <div className="max-w-7xl mx-auto px-6 relative z-10">

                        {/* Title Center */}
                        <div className="text-center mb-16 relative inline-block w-full reveal">
                            <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
                                Visi & Misi

                                <span className="absolute -left-10 top-0 w-6 h-6 border-l-4 border-t-4 border-green-800"></span>
                                <span className="absolute -right-10 bottom-0 w-6 h-6 border-r-4 border-b-4 border-green-800"></span>
                            </h2>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                            {/* LEFT SIDE */}
                            <div>

                                {/* TEXT ATAS VISI */}
                                <h3 className="text-4xl font-bold text-gray-800 leading-snug mb-6 reveal reveal-left">
                                    KELOMPOK KERJA <br />
                                    PENGAWAS (POKJAWAS)
                                </h3>

                                <p className="text-gray-500 mb-10 font-medium text-lg reveal reveal-left delay-200">
                                    Kementerian Agama Kantor 
                                    Kabupaten Tangerang
                                </p>

                                {/* CARD VISI */}
                                <div className="relative bg-white rounded-3xl shadow-md px-8 py-10 mt-40 reveal reveal-left">

                                    {/* Label */}
                                    <div className="absolute -top-5 left-1 bg-green-800 text-white px-10 py-2 rounded-xl font-semibold">
                                        Visi
                                    </div>

                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        Terwujudnya pengawas profesional religius dan bermartabat.
                                    </p>

                                    {/* AKSEN MIRING (BIAR SAMA KAYAK MISI) */}
                                    <div className="absolute bottom-0 right-0 w-full h-7 bg-green-800 clip-visi"></div>
                                </div>

                            </div>

                            {/* RIGHT SIDE (MISi) */}
                            <div className="relative bg-white rounded-3xl shadow-md px-8 py-10 reveal reveal-right">

                                {/* Label */}
                                <div className="absolute -top-5 right-1 bg-green-800 text-white px-10 py-2 rounded-xl font-semibold">
                                    Misi
                                </div>

                                <ol className="list-decimal pl-5 space-y-4 text-gray-700 text-lg leading-relaxed ">
                                    <li>Meningkatkan kompetensi pengawas melalui workshop, Diklat, Seminar dan FGD.</li>
                                    <li>Melaksanakan pemantauan layanan 8 standar pendidikan pada madrasah.</li>
                                    <li>Melaksanakan pembimbingan dan pembinaan guru dan/atau kepala madrasah secara berkala.</li>
                                    <li>Melaksanakan kajian Agama Islam.</li>
                                    <li>Melaksanakan kegiatan sosial.</li>
                                    <li>Menebarkan salam.</li>
                                </ol>

                                {/* AKSEN MIRING */}
                                <div className="absolute bottom-0 left-0 w-full h-7 bg-green-800 clip-misi"></div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* STRUKTUR */}
                <section className="pb-20 mt-14">
                    <div className="max-w-5xl mx-auto px-6 reveal">

                        <div className="text-center mb-10 ">
                            <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
                                Struktur Organisasi

                                <span className="absolute -left-10 top-0 w-6 h-6 border-l-4 border-t-4 border-green-800"></span>
                                <span className="absolute -right-10 bottom-0 w-6 h-6 border-r-4 border-b-4 border-green-800"></span>
                            </h2>
                        </div>

                        {/* TABLE */}
                        <div className="border border-green-800 rounded-2xl overflow-hidden mb-6">

                            {/* Ketua */}
                            <div className="grid grid-cols-3 border-b border-green-800">
                                <div className="p-4 font-semibold text-green-800 border-r border-green-800">
                                    Ketua
                                </div>
                                <div className="col-span-2 p-4 text-green-800">
                                    H. Suherman, S.Ag. MM
                                </div>
                            </div>

                            {/* Wakil */}
                            <div className="grid grid-cols-3 border-b border-green-800">
                                <div className="p-4 font-semibold text-green-800 border-r border-green-800">
                                    Wakil Ketua
                                </div>
                                <div className="col-span-2 p-4 text-green-800">
                                    1. H. Mulyadi, S.Ag. M.Pd <br />
                                    2. H. Syarani, S.Ag. MM <br />
                                    3. H. Sholeh, M.Pd
                                </div>
                            </div>

                            {/* Sekretaris */}
                            <div className="grid grid-cols-3 border-b border-green-800">
                                <div className="p-4 font-semibold text-green-800 border-r border-green-800">
                                    Sekretaris
                                </div>
                                <div className="col-span-2 p-4 text-green-800">
                                    1. H. Sukirno Akmadroji, M.Pd <br />
                                    2. H. Budiman
                                </div>
                            </div>

                            {/* Bendahara */}
                            <div className="grid grid-cols-3">
                                <div className="p-4 font-semibold text-green-800 border-r border-green-800">
                                    Bendahara
                                </div>
                                <div className="col-span-2 p-4 text-green-800">
                                    1. Burdahnudin, M.Pd <br />
                                    2. Asto, ST
                                </div>
                            </div>

                        </div>

                        <div className="space-y-4">
                        {dropdownData.map((item) => (
                            <div
                            key={item.id}
                            className="border border-green-800 rounded-xl overflow-hidden"
                            >
                            {/* BUTTON */}
                            <button
                                onClick={() => toggle(item.id)}
                                className="w-full flex justify-between items-center bg-green-800 text-white px-4 py-3 font-semibold"
                            >
                                {item.title}

                                {/* ICON */}
                                <span
                                className={`transition-transform duration-300 ${
                                    open === item.id ? "rotate-45 scale-110" : ""
                                }`}
                                >
                                +
                                </span>
                            </button>

                            {/* CONTENT */}
                            <div
                                className={`overflow-hidden transition-[max-height] duration-700 ease-in-out will-change-[max-height] ${
                                open === item.id ? "max-h-[1000px]" : "max-h-0"
                                }`}
                            >
                                <div className="p-4 bg-white text-green-800 space-y-1">
                                {item.content.map((c, i) => (
                                    <div key={i}>
                                    {i + 1}. {c}
                                    </div>
                                ))}
                                </div>
                            </div>
                            </div>
                        ))}
                        </div>

                    </div>
                </section>

                {/* Footer */}
                    <section className="relative pt-40 pb-20 flex justify-center mt-32 mb-10">
      
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

            </div>
        </>
    );
}