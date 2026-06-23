import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { InstagramIcon, YoutubeIcon, FacebookIcon } from "@/Components/icon";

export default function Welcome({ auth }) {
    const [isOpen, setIsOpen] = useState(false);

    const featuredNews = [
        {
            id: 1,
            title: "Pokjawas Madrasah Gelar Rapat Koordinasi Guna Tingkatkan Mutu Pendidikan",
            date: "Kamis, 5 Maret 2026",
            category: "Nasional",
            image: "/images/img_hero_1.png",
        },
        {
            id: 2,
            title: "Pokjawas Lakukan Monitoring dan Evaluasi Pelaksanaan Ujian Akhir Madrasah",
            date: "Jumat, 6 Maret 2026",
            category: "Nasional",
            image: "/images/img_hero_2.png",
        },
        {
            id: 3,
            title: "Pokjawas Kemenag Sosialisasikan Regulasi Terbaru Mengenai Beban Kerja Guru",
            date: "Sabtu, 7 Maret 2026",
            category: "Nasional",
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
            { threshold: 0.15 },
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Head title="Beranda" />

            {/* HERO SECTION */}
            <section className="bg-gray-100 min-h-screen font-jakarta overflow-x-hidden">
                {/* --- START NAVBAR --- */}
                <nav className="w-full relative z-50">
                    {/* TOP BAR - Hidden on Mobile */}
                    <div className="hidden md:flex bg-green-800 text-white justify-between items-center">
                        <div className="relative bg-yellow-400 px-6 py-2 font-semibold text-white">
                            Media Sosial
                            <div className="absolute top-0 right-[-20px] w-0 h-0 border-t-[40px] border-t-yellow-400 border-r-[20px] border-r-transparent"></div>
                        </div>

                        <div className="flex-1 flex justify-center gap-10 lg:gap-40">
                            <a href="#" className="group">
                                <InstagramIcon className="w-5 h-5 text-white group-hover:text-yellow-400 transition duration-300" />
                            </a>
                            <a href="#" className="group">
                                <YoutubeIcon className="w-5 h-5 text-white group-hover:text-yellow-400 transition duration-300" />
                            </a>
                            <a href="#" className="group">
                                <FacebookIcon className="w-5 h-5 text-white group-hover:text-yellow-400 transition duration-300" />
                            </a>
                        </div>
                    </div>

                    {/* NAVBAR CARD */}
                    <div className="max-w-7xl mx-auto mt-4 bg-white rounded-xl shadow-md px-6 py-4 relative flex items-center justify-between">
                        {/* LOGO SECTION */}
                        <div className="flex items-center gap-4">
                            <img
                                src="/images/logo_kemenag.png"
                                className="w-10 h-10 object-contain"
                            />
                            <div className="w-px h-8 bg-gray-300 hidden md:block"></div>
                        </div>

                        {/* DESKTOP NAV - Hidden on Mobile */}
                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8 lg:gap-20 text-gray-600 font-semibold">
                            <Link
                                href="/"
                                className="text-green-600 font-bold transition duration-300"
                            >
                                Beranda
                            </Link>
                            <Link
                                href="/struktur"
                                className="hover:text-green-600 hover:font-bold transition duration-300"
                            >
                                Profil
                            </Link>
                            <Link
                                href="/berita"
                                className="hover:text-green-600 hover:font-bold transition duration-300"
                            >
                                Berita
                            </Link>
                            <Link
                                href="/kegiatan"
                                className="hover:text-green-600 hover:font-bold transition duration-300"
                            >
                                Kegiatan
                            </Link>
                        </div>

                        {/* MOBILE CONTROLS (SVG Manual) */}
                        <div className="flex items-center gap-4">
                            {/* Desktop Login Button */}
                            <Link
                                href={route("login")}
                                className="hidden md:block bg-green-800 text-white px-6 py-2 rounded-lg font-semibold"
                            >
                                Login
                            </Link>

                            {/* Mobile Profile Icon (SVG) */}
                            <Link
                                href="/login"
                                className="md:hidden text-green-800"
                            >
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 2a5 5 0 100 10 5 5 0 000-10zm0 14c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
                                </svg>
                            </Link>

                            {/* Hamburger Button (SVG) */}
                            <button
                                onClick={() => setIsOpen(true)}
                                className="md:hidden text-green-800"
                            >
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="3" y1="12" x2="21" y2="12"></line>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <line x1="3" y1="18" x2="21" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* MOBILE SIDEBAR OVERLAY */}
                    <div
                        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                        onClick={() => setIsOpen(false)}
                    />

                    {/* MOBILE SIDEBAR MENU */}
                    <div
                        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-[70] transform transition-transform duration-300 ease-in-out md:hidden
                        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-bold text-gray-800 font-jakarta">
                                    Menu
                                </h3>
                                {/* Close Button (SVG X) */}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-green-800"
                                >
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line
                                            x1="18"
                                            y1="6"
                                            x2="6"
                                            y2="18"
                                        ></line>
                                        <line
                                            x1="6"
                                            y1="6"
                                            x2="18"
                                            y2="18"
                                        ></line>
                                    </svg>
                                </button>
                            </div>

                            <nav className="flex flex-col space-y-4 border-b pb-6 font-jakarta">
                                <Link
                                    href="/"
                                    className="text-green-600 font-bold bg-green-50 p-3 rounded-lg"
                                >
                                    Beranda
                                </Link>
                                <Link
                                    href="/struktur"
                                    className="text-gray-700 p-3"
                                >
                                    Profil
                                </Link>
                                <Link
                                    href="/berita"
                                    className="text-gray-700 p-3"
                                >
                                    Berita
                                </Link>
                                <Link
                                    href="/kegiatan"
                                    className="text-gray-700 p-3"
                                >
                                    Kegiatan
                                </Link>
                                <Link
                                    href="/kontak"
                                    className="text-gray-700 p-3"
                                >
                                    Kontak Kami
                                </Link>
                            </nav>

                            <div className="mt-8 px-3">
                                <p className="font-bold text-gray-800 mb-6 font-jakarta">
                                    Media Sosial
                                </p>
                                <div className="flex gap-6">
                                    <div className="flex-1 flex justify-center gap-20 lg:gap-40">
                                        <a href="#" className="group">
                                            <InstagramIcon className="w-5 h-5 text-green-600 group-hover:text-yellow-400 transition duration-300" />
                                        </a>
                                        <a href="#" className="group">
                                            <YoutubeIcon className="w-5 h-5 text-green-600 group-hover:text-yellow-400 transition duration-300" />
                                        </a>
                                        <a href="#" className="group">
                                            <FacebookIcon className="w-5 h-5 text-green-600 group-hover:text-yellow-400 transition duration-300" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                {/* --- END NAVBAR --- */}

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
                                Bersinergi dalam pengawasan dan pembinaan untuk
                                meningkatkan mutu pendidikan yang profesional,
                                transparan, dan berintegritas, serta mewujudkan
                                lingkungan pendidikan yang berkualitas dan
                                akuntabel.
                            </p>
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
                                <span className="absolute -left-2 top-0 w-6 h-6 border-l-4 border-t-4 border-green-800"></span>
                                <span className="absolute -right-2 bottom-0 w-6 h-6 border-r-4 border-b-4 border-green-800"></span>
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

                                <div
                                    className="
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
                                "
                                >
                                    H. Suherman, S.Ag. MM
                                </div>
                            </div>

                            {/* Text Sambutan */}
                            <div className="flex-1">
                                <h3 className="text-4xl font-bold text-gray-800 mb-5 leading-tight">
                                    Selamat Datang di Website Resmi Pokjawas
                                    Kab. Tangerang
                                </h3>

                                <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                                    <p>
                                        Assalamu’alaikum Warahmatullahi
                                        Wabarakatuh Puji syukur ke hadirat Allah
                                        SWT, website resmi Pokjawas Kemenag
                                        Kabupaten Tangerang dapat hadir sebagai
                                        sarana informasi dan komunikasi bagi
                                        guru, kepala madrasah, dan seluruh
                                        stakeholder pendidikan.
                                    </p>

                                    <p>
                                        Website ini merupakan komitmen dalam
                                        mewujudkan pengawas yang profesional,
                                        religius, dan bermartabat, serta untuk
                                        meningkatkan mutu layanan, transparansi,
                                        dan kolaborasi dengan madrasah binaan.
                                    </p>

                                    <p>
                                        Kami berperan sebagai mitra yang
                                        membina, mendampingi, dan menginspirasi
                                        demi terwujudnya madrasah yang
                                        berkualitas dan berakhlak mulia.
                                    </p>

                                    <p>
                                        Melalui website ini, berbagai informasi,
                                        program, dan inovasi dapat diakses
                                        dengan mudah. Kami juga mengharapkan
                                        masukan untuk peningkatan layanan ke
                                        depan.
                                    </p>

                                    <p>
                                        Semoga website ini bermanfaat bagi
                                        kemajuan pendidikan madrasah di
                                        Kabupaten Tangerang. Wassalamu’alaikum
                                        Warahmatullahi Wabarakatuh.
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
                                    Kementerian Agama Kantor Kabupaten Tangerang
                                </p>

                                {/* CARD VISI */}
                                <div className="relative bg-white rounded-3xl shadow-md px-8 py-10 mt-40 reveal reveal-left">
                                    {/* Label */}
                                    <div className="absolute -top-5 left-1 bg-green-800 text-white px-10 py-2 rounded-xl font-semibold">
                                        Visi
                                    </div>

                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        Terwujudnya pengawas profesional
                                        religius dan bermartabat.
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
                                    <li>
                                        Meningkatkan kompetensi pengawas melalui
                                        workshop, Diklat, Seminar dan FGD.
                                    </li>
                                    <li>
                                        Melaksanakan pemantauan layanan 8
                                        standar pendidikan pada madrasah.
                                    </li>
                                    <li>
                                        Melaksanakan pembimbingan dan pembinaan
                                        guru dan/atau kepala madrasah secara
                                        berkala.
                                    </li>
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
                                    href={route("berita")}
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
                                                    index === current
                                                        ? "opacity-100 z-10"
                                                        : "opacity-0"
                                                }`}
                                            >
                                                <img
                                                    src={item.image}
                                                    className="w-full h-full object-cover"
                                                />

                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>

                                                <div className="absolute bottom-10 left-6 right-6 text-white">
                                                    <p className="text-green-300 text-sm">
                                                        {item.category}
                                                    </p>
                                                    <h3 className="text-2xl font-bold">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-sm opacity-80 mt-1">
                                                        {item.date}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* DOT DI BAWAH GAMBAR */}
                                    <div className="flex justify-center mt-4 gap-2">
                                        {featuredNews.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    setCurrent(index)
                                                }
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
                                                    Madrasah
                                                </p>

                                                <h4 className="text-gray-800 font-semibold leading-snug group-hover:text-green-700 transition">
                                                    Pokjawas Dorong Digitalisasi Madrasah Melalui Pelatihan Pembuatan Media Pembelajaran
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
                                <div
                                    key={item}
                                    className="bg-white rounded-2xl shadow-md overflow-hidden group"
                                >
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
                                            {item === 1 &&
                                                "Pembinaan dan Penilaian Kepala Madrasah 2026"}
                                            {item === 2 &&
                                                "Sosialisasi kurikulum berbasis cinta"}
                                            {item === 3 && "Pokjawas Berkomitmen Bawa Perubahan Positif bagi Madrasah"}
                                        </h3>

                                        <p className="text-gray-600 text-sm">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Us Section */}
                <section className="bg-gray-100 py-20 reveal">
                    <div className="relative max-w-4xl mx-auto px-6 ">
                        {/* CARD */}
                        <div className="relative bg-green-800 rounded-3xl p-12 shadow-lg">
                            {/* CONTENT */}
                            <div className="text-white max-w-lg ml-auto">
                                <h2 className="text-3xl font-bold mb-2">
                                    Hubungi Kami
                                </h2>

                                <p className="mb-6 text-green-100">
                                    Pokjawas Kemenag Tangerang Kabupaten
                                </p>

                                {/* FORM */}
                                <form className="space-y-4 pb-0 sm:pb-10 align-middle">
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

                            {/* MAPS */}
                            <div
                                className="w-full h-64 mb-6 mt-12  {/* <--- Tambahkan mt-12 di sini */}
                                md:mt-0                             {/* <--- Reset margin top di desktop agar tidak berantakan */}
                                md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/3
                                md:w-72 md:h-[400px] sm:bottom-6
                                rounded-2xl overflow-hidden shadow-lg"
                            >
                                <iframe
                                    src="https://www.google.com/maps?q=Kementerian+Agama+Kabupaten+Tangerang&output=embed"
                                    className="w-full h-full border-0"
                                    allowFullScreen
                                    loading="lazy"
                                    title="Google Maps"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <section className="relative pt-40 pb-20 flex justify-center mt-32 mb-10">
                    {/* Gradient background */}
                    <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] h-[130%] 
                        bg-gradient-to-t 
                        from-green-800/80 
                        via-green-700/40 
                        to-transparent 
                        rounded-2xl"
                    ></div>

                    {/* Footer Card */}
                    <div className="relative bg-white w-[85%] max-w-6xl rounded-2xl shadow-md p-10">
                        <div className="flex flex-col md:flex-row sm:flex-none justify-between gap-10">
                            {/* Kiri */}
                            <div className="max-w-sm space-y-4">
                                <img
                                    src="/images/logo_kemenag.png"
                                    alt="Kemenag"
                                    className="h-10"
                                />

                                <p className="text-sm text-gray-600">
                                    Silakan masukkan email Anda untuk
                                    menyampaikan pengaduan atau aspirasi.
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
                                    Dengan mengirimkan email, Anda menyetujui
                                    kebijakan privasi kami dan bersedia menerima
                                    informasi terkait tindak lanjut pengaduan.
                                </p>
                            </div>

                            {/* Kanan */}
                            <div className="flex flex-col sm:flex-row gap-10 md:gap-16 md:text-right sm:text-left">
                                {/* Navigasi */}
                                <div>
                                    <h3 className="text-gray-500 font-semibold mb-3">
                                        Navigasi
                                    </h3>
                                    <ul className="space-y-2 text-sm text-gray-500">
                                        <li>
                                            <a
                                                href="/"
                                                className="hover:text-green-700"
                                            >
                                                Beranda
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/struktur"
                                                className="hover:text-green-700"
                                            >
                                                Profil
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/berita"
                                                className="hover:text-green-700"
                                            >
                                                Berita
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/kegiatan"
                                                className="hover:text-green-700"
                                            >
                                                Kegiatan
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                {/* Media Sosial */}
                                <div>
                                    <h3 className="text-gray-500 font-semibold mb-3">
                                        Media Sosial
                                    </h3>
                                    <ul className="space-y-2 text-sm text-gray-500">
                                        <li>
                                            <a
                                                href="#"
                                                className="hover:text-green-700"
                                            >
                                                Instagram
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="hover:text-green-700"
                                            >
                                                Youtube
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="hover:text-green-700"
                                            >
                                                Facebook
                                            </a>
                                        </li>
                                        
                                    </ul>
                                </div>

                                {/* Kontak */}
                                <div className="max-w-xs">
                                    <h3 className="text-gray-500 font-semibold mb-3">
                                        Kontak
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Alamat : Jln. M. Atik Soeradi Pusat
                                        Pemerintahan Kabupaten Tangerang,
                                        Tigaraksa - 15720
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
                            © 2026 Kementerian Agama Kabupaten Tangerang. All
                            Rights Reserved.
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
}
