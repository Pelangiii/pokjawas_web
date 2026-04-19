import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';


export default function Welcome({ auth }) {
        const featuredNews = [
        {
            id: 1,
            title: "Lorem Ipsum dolor sit amet met pojok lawas yes yes 676767",
            date: "Kamis, 5 Maret 2026",
            category: "Nasional",
            image: "/images/img_hero_1.png",
        },
        {
            id: 2,
            title: "Berita Kedua biar keliatan slider jalan",
            date: "Jumat, 6 Maret 2026",
            category: "Internasional",
            image: "/images/img_hero_2.png",
        },
        {
            id: 3,
            title: "Berita Ketiga auto geser mantap",
            date: "Sabtu, 7 Maret 2026",
            category: "Pers Rilis",
            image: "/images/img_hero_3.png",
        },
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % featuredNews.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

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
            <Head title="Beranda" />

        {/* HERO SECTION */}
            <section className="bg-gray-100 min-h-screen font-jakarta">

                {/* TOP BAR */}
                <div className="bg-green-800 text-white flex justify-between items-center">
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
                    <div className="flex items-center gap-4">
                        <img src="/images/logo_kemenag.png" className="w-10 h-10 object-contain" />
                        <div className="w-px h-8 bg-gray-300"></div>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 flex gap-20 text-gray-600 font-semibold font-jakarta">
                        <Link href="/" className="text-green-600 transition duration-300">Beranda</Link>
                        <Link href="/struktur" className="hover:text-green-600 transition duration-300">Profil</Link>
                        <Link href="/berita" className="hover:text-green-600 transition duration-300">Berita</Link>
                        <Link href="/kegiatan" className="hover:text-green-600 transition duration-300">Kegiatan</Link>
                    </div>
                </div>


                {/* HERO SECTION */}
                <section className="relative overflow-hidden">
                    <img
                        src="/images/city_bg.svg"
                        className="absolute bottom-0 left-0 w-full opacity-70 z-0"
                    />

                    <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 relative z-10 pb-20">

                        <div className="pt-10 mt-8 font-jakarta reveal reveal-left">
                            <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                                Pokjawas Kemenag <br />
                                Kabupaten Tangerang
                            </h1>

                            <p className="mt-4 text-xl text-gray-600 leading-relaxed">
                                Bersinergi dalam pengawasan dan pembinaan untuk meningkatkan mutu
                                pendidikan yang profesional, transparan, dan berintegritas, serta
                                mewujudkan lingkungan pendidikan yang berkualitas dan akuntabel.
                            </p>

                            <Link
                                href={route('login')}
                                className="inline-block mt-6 bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full transition"
                            >
                                Login
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4 reveal reveal-right">

                        {/* IMAGE 1 */}
                        <div className="overflow-hidden rounded-2xl group">
                            <img
                                src="/images/img_hero_1.png"
                                className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
                            />
                        </div>

                        {/* IMAGE 2 */}
                        <div className="overflow-hidden rounded-2xl group">
                            <img
                                src="/images/img_hero_2.png"
                                className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
                            />
                        </div>

                        {/* IMAGE 3 (LEBAR) */}
                        <div className="overflow-hidden rounded-2xl col-span-2 group">
                            <img
                                src="/images/img_hero_3.png"
                                className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
                            />
                        </div>

                    </div>

                    </div>
                </section>


                {/* SAMBUTAN SECTION */}
                <section className="py-20 bg-gray-100 font-jakarta">
                    <div className="max-w-7xl mx-auto px-6 reveal">

                        {/* Title */}
                        <div className="text-center mb-12 relative inline-block w-full">
                            <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
                                Sambutan Ketua Pokjawas

                                <span className="absolute -left-10 top-0 w-6 h-6 border-l-4 border-t-4 border-green-800"></span>
                                <span className="absolute -right-10 bottom-0 w-6 h-6 border-r-4 border-b-4 border-green-800"></span>
                            </h2>
                        </div>

                        {/* Card */}
                        <div className="bg-white rounded-3xl shadow-md px-10 py-10 flex flex-col lg:flex-row gap-12 items-start">

                            {/* Foto Ketua */}
                            <div className="relative flex-shrink-0 w-fit mx-auto my-auto lg:mx-0">

                                <img
                                    src="/images/pa suherman.png"
                                    alt="Pak Suherman"
                                    className="w-96 object-contain"
                                />

                                <div className="
                                    absolute
                                    left-1/2
                                    -translate-x-1/2
                                    bottom-[-20px]
                                    bg-green-800
                                    text-white
                                    px-20
                                    py-4
                                    rounded-2xl
                                    font-bold
                                    text-lg
                                    whitespace-nowrap
                                    shadow-lg
                                ">
                                    H. Suherman, S.Ag. MM
                                </div>

                            </div>

                            {/* Text Sambutan */}
                            <div className="flex-1">
                                <h3 className="text-4xl font-bold text-gray-800 mb-5 leading-tight">
                                    Selamat Datang di Website Resmi Pokjawas Kab. Tangerang
                                </h3>

                                <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                                    <p>
                                        Assalamu’alaikum Warahmatullahi Wabarakatuh Puji syukur ke hadirat Allah SWT,
                                        website resmi Pokjawas Kemenag Kabupaten Tangerang dapat hadir sebagai sarana
                                        informasi dan komunikasi bagi guru, kepala madrasah, dan seluruh stakeholder pendidikan.
                                    </p>

                                    <p>
                                        Website ini merupakan komitmen dalam mewujudkan pengawas yang profesional,
                                        religius, dan bermartabat, serta untuk meningkatkan mutu layanan, transparansi,
                                        dan kolaborasi dengan madrasah binaan.
                                    </p>

                                    <p>
                                        Kami berperan sebagai mitra yang membina, mendampingi, dan menginspirasi demi
                                        terwujudnya madrasah yang berkualitas dan berakhlak mulia.
                                    </p>

                                    <p>
                                        Melalui website ini, berbagai informasi, program, dan inovasi dapat diakses
                                        dengan mudah. Kami juga mengharapkan masukan untuk peningkatan layanan ke depan.
                                    </p>

                                    <p>
                                        Semoga website ini bermanfaat bagi kemajuan pendidikan madrasah di Kabupaten Tangerang.
                                        Wassalamu’alaikum Warahmatullahi Wabarakatuh.
                                    </p>
                                </div>
                            </div>

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
                        <div className="text-center mb-16 relative inline-block w-full">
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

                {/* BERITA TERKINI */}
                <section className="bg-gray-100 pb-20 mt-32 font-jakarta">
                    <div className="max-w-7xl mx-auto px-6">

                        {/* CARD PUTIH */}
                        <div className="bg-white rounded-3xl shadow-md px-8 py-16 reveal">

                            <div className="flex items-center justify-between mb-10">
                                {/* TITLE */}
                                <h2 className="text-4xl font-bold text-gray-800">
                                    Berita Terkini
                                </h2>

                                {/* BUTTON */}
                                <Link
                                    href={route('berita')}
                                    className="border-2 border-green-800 text-gray-800 px-6 py-2 rounded-2xl flex items-center gap-2 hover:bg-green-800 hover:text-white transition"
                                >
                                    Lihat Berita Lainnya →
                                </Link>
                            </div>

                            {/* GRID */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                                {/* LEFT - SLIDER */}
                                <div className="lg:col-span-2">
    
                                    {/* SLIDER */}
                                    <div className="relative h-[500px] overflow-hidden rounded-2xl">
                                        {featuredNews.map((item, index) => (
                                            <Link
                                                key={item.id}
                                                href={`/berita/${item.id}`}
                                                className={`absolute inset-0 transition-opacity duration-700 ${
                                                    index === current ? "opacity-100 z-10" : "opacity-0"
                                                }`}
                                            >
                                                <img src={item.image} className="w-full h-full object-cover" />

                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>

                                                <div className="absolute bottom-10 left-6 right-6 text-white">
                                                    <p className="text-green-300 text-sm">{item.category}</p>
                                                    <h3 className="text-2xl font-bold">{item.title}</h3>
                                                    <p className="text-sm opacity-80 mt-1">{item.date}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* DOT DI BAWAH GAMBAR */}
                                    <div className="flex justify-center mt-4 gap-2">
                                        {featuredNews.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrent(index)}
                                                className={`w-3 h-3 rounded-full transition ${
                                                    index === current
                                                        ? "bg-green-600"
                                                        : "bg-gray-300"
                                                }`}
                                            ></button>
                                        ))}
                                    </div>

                                </div>

                                {/* RIGHT - LIST */}
                                <div className="flex flex-col gap-6 my-auto">

                                    {[1, 2, 3].map((item) => (
                                        <Link
                                            key={item}
                                            href={`/berita/${item.id}`}
                                            className="flex gap-4 group"
                                        >
                                            {/* THUMB */}
                                            <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                                                <img
                                                    src="/images/img_hero_2.png"
                                                    className="w-full h-full object-cover group-hover:scale-105 transition"
                                                />
                                            </div>

                                            {/* TEXT */}
                                            <div className="flex-1">
                                                <p className="text-green-600 text-sm font-medium">
                                                    Pers Rilis
                                                </p>

                                                <h4 className="text-gray-800 font-semibold leading-snug group-hover:text-green-700 transition">
                                                    Kemenag: Menag Ajak Umat Islam Lampaui Standar Minimal Zakat
                                                </h4>

                                                <p className="text-sm text-gray-400 mt-1">
                                                    Rabu, 4 Maret 2026
                                                </p>
                                            </div>
                                        </Link>
                                    ))}

                                </div>

                            </div>

                        </div>
                    </div>
                </section>

                {/* Kegiatan Section */}
                <section className="relative py-20 overflow-hidden">

                    {/* Background */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/images/city_bg.svg"
                            className="absolute bottom-0 left-0 w-full opacity-40"
                        />
                    </div>

                    <div className="relative max-w-6xl mx-auto px-6">

                        {/* TITLE */}
                        <div className="text-center mb-20 relative inline-block w-full">
                            <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
                                Kegiatan

                                <span className="absolute -left-10 top-0 w-6 h-6 border-l-4 border-t-4 border-green-800"></span>
                                <span className="absolute -right-10 bottom-0 w-6 h-6 border-r-4 border-b-4 border-green-800"></span>
                            </h2>
                        </div>

                        {/* BUTTON */}
                        <div className="flex justify-end mb-12">
                            <Link
                                href="/kegiatan"
                                className="border-2 border-green-800 text-gray-800 px-6 py-2 rounded-2xl flex items-center gap-2 hover:bg-green-800 hover:text-white transition"
                            >
                                Lihat Kegiatan Lainnya →
                            </Link>
                        </div>

                        {/* DATA DUMMY */}
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="hidden" />
                        ))}

                        {/* GRID */}
                        <div className="grid md:grid-cols-3 gap-6 reveal">

                            {[1, 2, 3].map((item) => (
                                <div key={item} className="bg-white rounded-2xl shadow-md overflow-hidden group">

                                    {/* IMAGE */}
                                    <div className="relative overflow-hidden">
                                        <img
                                            src="/images/img_hero_3.png"
                                            className="w-full h-52 object-cover transition duration-500 group-hover:scale-110"
                                        />

                                        {/* ICON LINK */}
                                        <Link
                                            href={`/kegiatan/${item}`}
                                            className="absolute top-3 right-3 bg-green-800 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg hover:scale-110 transition"
                                        >
                                            ↗
                                        </Link>
                                    </div>

                                    {/* TEXT */}
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg text-gray-800 mb-2">
                                            {item === 1 && "Pembinaan dan Penilaian Kepala Madrasah 2026"}
                                            {item === 2 && "Sosialisasi kurikulum berbasis cinta"}
                                            {item === 3 && "Judul Kegiatan"}
                                        </h3>

                                        <p className="text-gray-600 text-sm">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        </p>
                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>
                </section>

                {/* Contact Us Section */}
                <section className="bg-gray-100 py-20 reveal">
                    <div className="relative max-w-4xl mx-auto px-6">

                        {/* CARD */}
                        <div className="relative bg-green-800 rounded-3xl p-12 pl-64 shadow-lg">

                        {/* MAPS */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 w-80 h-[400px] rounded-2xl overflow-hidden shadow-lg z-10">
                            <iframe
                            src="https://www.google.com/maps?q=Kementerian+Agama+Kabupaten+Tangerang&output=embed"
                            className="w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                            title="Google Maps"
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="text-white max-w-lg ml-auto">

                            <h2 className="text-3xl font-bold mb-2">
                            Hubungi Kami
                            </h2>

                            <p className="mb-6 text-green-100">
                            Pokjawas Kemenag Tangerang Kabupaten
                            </p>

                            {/* FORM */}
                            <form className="space-y-4">

                            <input
                                type="text"
                                placeholder="Nama"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 outline-none"
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Nomor Telfon"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 outline-none"
                            />

                            <textarea
                                placeholder="Tuliskan Pesan Anda"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 outline-none h-32"
                            ></textarea>

                            <div className="text-right">
                                <button
                                type="submit"
                                className="bg-gray-200 text-green-800 px-8 py-2 rounded-full font-semibold hover:bg-white transition"
                                >
                                Kirim
                                </button>
                            </div>

                            </form>
                        </div>
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
            </section>

        </>
    );
}