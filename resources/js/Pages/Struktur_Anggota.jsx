import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { InstagramIcon, YoutubeIcon, FacebookIcon } from "@/Components/icon";

export default function Profil() {
    const [isOpen, setIsOpen] = useState(false);

    // State dropdown koordinasi struktur baru (true berarti default-nya terbuka)
    const [openSections, setOpenSections] = useState({
        tk_ra_sd_mi: false,
        smp_mts: false,
        sma_smk_ma_mak: false,
        kompetensi: false,
        laporan_evaluasi: false,
        kesejahteraan_sosial: false,
    });

    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

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

    // Sub-Komponen Card Anggota - LEBIH LEBAR & TEKS OTOMATIS WRAP (GA KEPOTONG)
    const MemberCard = ({ name, title, imageUrl, isCore = false }) => (
        <div
            className={`flex flex-col items-center flex-1 min-w-[140px] ${
                isCore ? "max-w-[180px]" : "max-w-[210px]"
            }`}
        >
            {title && (
                <span className="text-green-800 font-semibold text-sm mb-2">
                    {title}
                </span>
            )}

            {/* Box Foto */}
            <div
                className={`w-24 h-28 bg-gray-200 shadow-md flex items-center justify-center overflow-hidden mb-2 rounded-md ${
                    isCore
                        ? "border-2 border-gray-300"
                        : "border border-green-700"
                }`}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-cover object-center block"
                    />
                ) : (
                    <div className="text-[10px] text-gray-400 font-medium text-center p-2">
                        Belum Ada Foto
                    </div>
                )}
            </div>

            {/* Label Nama (Lebih lebar, teks wrap ke bawah jika panjang, tidak truncate) */}
            <div className="w-full border border-green-800 rounded-2xl px-3 py-1.5 text-center bg-white shadow-sm min-h-[40px] flex items-center justify-center">
                <p className="text-[11px] md:text-xs font-semibold text-green-950 whitespace-normal leading-tight">
                    {name}
                </p>
            </div>
        </div>
    );

    return (
        <>
            <Head title="Profil" />

            <div className="bg-gray-100 min-h-screen font-jakarta">
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
                                alt="Logo Kemenag"
                            />
                            <div className="w-px h-8 bg-gray-300 hidden md:block"></div>
                        </div>

                        {/* DESKTOP NAV */}
                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8 lg:gap-20 text-gray-600 font-semibold">
                            <Link
                                href="/"
                                className="hover:text-green-600 hover:font-bold transition duration-300"
                            >
                                Beranda
                            </Link>
                            <Link
                                href="/struktur"
                                className="text-green-600 font-bold transition duration-300"
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

                        {/* MOBILE CONTROLS */}
                        <div className="flex items-center gap-4">
                            <Link
                                href={route("login")}
                                className="hidden md:block bg-green-800 text-white px-6 py-2 rounded-lg font-semibold"
                            >
                                Login
                            </Link>
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
                </nav>
                {/* --- END NAVBAR --- */}

                {/* PROFIL ABOUT */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-12 relative">
                            <h2 className="text-4xl font-bold inline-block relative">
                                Profil
                                <span className="absolute -left-10 top-0 w-6 h-6 border-l-4 border-t-4 border-green-800"></span>
                                <span className="absolute -right-10 bottom-0 w-6 h-6 border-r-4 border-b-4 border-green-800"></span>
                            </h2>
                        </div>

                        <div className="bg-white rounded-3xl p-10 max-w-5xl mx-auto shadow-md reveal">
                            <h3 className="text-3xl font-semibold text-center mb-10">
                                Tentang Pokjawas
                            </h3>
                            <img
                                src="/images/img_hero_3.png"
                                className="mx-auto mb-8 rounded-xl"
                                alt="Hero"
                            />
                            <p className="text-center leading-8 text-gray-800">
                                {" "}
                                Pokjawas (Kelompok Kerja Pengawas) Madrasah/PAI
                                merupakan wadah bagi pengawas untuk meningkatkan
                                kompetensi dan kinerja melalui supervisi
                                akademik dan manajerial. Tugasnya meliputi
                                pembinaan guru dalam proses pembelajaran,
                                evaluasi dan pengembangan kurikulum, serta
                                pendampingan kepala madrasah dalam pengelolaan
                                sekolah.
                            </p>
                            <p className="text-center leading-8 mt-2 text-gray-800">
                                {" "}
                                Melalui peran tersebut, Pokjawas berkontribusi
                                dalam menjamin mutu pendidikan, mendorong
                                inovasi pembelajaran, serta memastikan penerapan
                                8 Standar Nasional Pendidikan di madrasah binaan
                                berjalan dengan baik.
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
                                <h3 className="text-4xl font-bold text-gray-800 leading-snug mb-6 reveal reveal-left">
                                    KELOMPOK KERJA <br />
                                    PENGAWAS (POKJAWAS)
                                </h3>

                                <p className="text-gray-500 mb-10 font-medium text-lg reveal reveal-left delay-200">
                                    Kementerian Agama Kantor Kabupaten Tangerang
                                </p>

                                {/* CARD VISI */}
                                <div className="relative bg-white rounded-3xl shadow-md px-8 py-10 mt-40 reveal reveal-left">
                                    <div className="absolute -top-5 left-1 bg-green-800 text-white px-10 py-2 rounded-xl font-semibold">
                                        Visi
                                    </div>

                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        Terwujudnya pengawas profesional
                                        religius dan bermartabat.
                                    </p>

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

                {/* --- STRUKTUR ORGANISASI VISUAL --- */}
                <section className="pb-20 mt-14">
                    <div className="max-w-6xl mx-auto px-6 reveal">
                        <div className="text-center mb-14">
                            <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
                                Struktur Organisasi
                                <span className="absolute -left-10 top-0 w-6 h-6 border-l-4 border-t-4 border-green-800"></span>
                                <span className="absolute -right-10 bottom-0 w-6 h-6 border-r-4 border-b-4 border-green-800"></span>
                            </h2>
                        </div>

                        <div className="flex flex-col items-center mb-12">
                            <MemberCard
                                name="H. Suherman, S.Ag. MM"
                                title="Ketua"
                                isCore={true}
                                imageUrl="images/member_pict_dummy.png"
                            />

                            <div className="w-0.5 h-8 bg-green-800 my-1"></div>
                            <div className="w-[60%] h-px bg-green-800"></div>
                            <div className="flex justify-between w-[62%] mb-4">
                                <div className="w-0.5 h-4 bg-green-800 mx-auto"></div>
                                <div className="w-0.5 h-4 bg-green-800 mx-auto"></div>
                                <div className="w-0.5 h-4 bg-green-800 mx-auto"></div>
                            </div>

                            <div className="flex justify-center gap-6 md:gap-12 w-full max-w-3xl">
                                <MemberCard
                                    name="H. Mulyadi, S.Ag. M.Pd"
                                    title="Wakil Ketua I"
                                    isCore={true}
                                    imageUrl="images/member_pict_dummy.png"
                                />
                                <MemberCard
                                    name="H. Syarani, S.Ag. MM"
                                    title="Wakil Ketua II"
                                    isCore={true}
                                    imageUrl="images/member_pict_dummy.png"
                                />
                                <MemberCard
                                    name="H. Sholeh, M.Pd"
                                    title="Wakil Ketua III"
                                    isCore={true}
                                    imageUrl="images/member_pict_dummy.png"
                                />
                            </div>

                            <div className="w-0.5 h-8 bg-green-800 my-2"></div>
                            <div className="w-[80%] h-px bg-green-800"></div>
                            <div className="flex justify-between w-[81%] mb-4">
                                <div className="w-0.5 h-4 bg-green-800"></div>
                                <div className="w-0.5 h-4 bg-green-800"></div>
                                <div className="w-0.5 h-4 bg-green-800"></div>
                                <div className="w-0.5 h-4 bg-green-800"></div>
                            </div>

                            <div className="flex justify-center gap-4 md:gap-8 w-full max-w-4xl">
                                <MemberCard
                                    name="H. Sukirno Akmadroji, M.Pd"
                                    title="Sekretaris I"
                                    isCore={true}
                                    imageUrl="images/member_pict_dummy.png"
                                />
                                <MemberCard
                                    name="H. Budiman"
                                    title="Sekretaris II"
                                    isCore={true}
                                    imageUrl="images/member_pict_dummy.png"
                                />
                                <MemberCard
                                    name="Burdahnudin, M.Pd"
                                    title="Bendahara I"
                                    isCore={true}
                                    imageUrl="images/member_pict_dummy.png"
                                />
                                <MemberCard
                                    name="Asto, ST"
                                    title="Bendahara II"
                                    isCore={true}
                                    imageUrl="images/member_pict_dummy.png"
                                />
                            </div>
                        </div>

                        <div className="space-y-6 max-w-4xl mx-auto">
                            {/* KORD. BID. TK/RA, SD/MI */}
                            <div className="border border-green-800 rounded-xl overflow-hidden bg-white shadow-sm">
                                <button
                                    onClick={() => toggleSection("tk_ra_sd_mi")}
                                    className="w-full bg-green-800 hover:bg-green-900 text-white font-bold py-3 text-sm flex justify-between px-4 items-center relative z-10"
                                >
                                    <span className="flex-1 text-center pl-4">
                                        KORD. BID. TK / RA, SD / MI
                                    </span>
                                    <span
                                        className={`transition-transform duration-300 ${openSections.tk_ra_sd_mi ? "rotate-180" : ""}`}
                                    >
                                        ▼
                                    </span>
                                </button>
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${openSections.tk_ra_sd_mi ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                >
                                    <div className="overflow-hidden bg-gray-50">
                                        <div className="p-6 flex flex-wrap justify-center gap-8">
                                            <MemberCard
                                                name="Drs Zaenas Solihin"
                                                imageUrl="images/member_pict_dummy.png"
                                            />
                                            <MemberCard
                                                name="Yahya, S.Pd.I"
                                                imageUrl="images/member_pict_dummy.png"
                                            />
                                            <MemberCard
                                                name="H. Misbakhul Munir, M.Pd"
                                                imageUrl="images/member_pict_dummy.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* KORD. BID. SMP/MTs */}
                            <div className="border border-green-800 rounded-xl overflow-hidden bg-white shadow-sm">
                                <button
                                    onClick={() => toggleSection("smp_mts")}
                                    className="w-full bg-green-800 hover:bg-green-900 text-white font-bold py-3 text-sm flex justify-between px-4 items-center relative z-10"
                                >
                                    <span className="flex-1 text-center pl-4">
                                        KORD. BID. SMP / MTs
                                    </span>
                                    <span
                                        className={`transition-transform duration-300 ${openSections.smp_mts ? "rotate-180" : ""}`}
                                    >
                                        ▼
                                    </span>
                                </button>
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${openSections.smp_mts ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                >
                                    <div className="overflow-hidden bg-gray-50">
                                        <div className="p-6 flex flex-wrap justify-center gap-8">
                                            <MemberCard
                                                name="Sarun, S.Ag, MM"
                                                imageUrl="images/member_pict_dummy.png"
                                            />
                                            <MemberCard
                                                name="Dr. Wuliyono, M.Si"
                                                imageUrl="images/member_pict_dummy.png"
                                            />
                                            <MemberCard
                                                name="Dr. Isep Rusmawan, MM"
                                                imageUrl="images/member_pict_dummy.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* KORD. BID. SMA, SMK/MA, MAK */}
                            <div className="border border-green-800 rounded-xl overflow-hidden bg-white shadow-sm">
                                <button
                                    onClick={() =>
                                        toggleSection("sma_smk_ma_mak")
                                    }
                                    className="w-full bg-green-800 hover:bg-green-900 text-white font-bold py-3 text-sm flex justify-between px-4 items-center relative z-10"
                                >
                                    <span className="flex-1 text-center pl-4">
                                        KORD. BID. SMA, SMK/MA, MAK
                                    </span>
                                    <span
                                        className={`transition-transform duration-300 ${openSections.sma_smk_ma_mak ? "rotate-180" : ""}`}
                                    >
                                        ▼
                                    </span>
                                </button>
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${openSections.sma_smk_ma_mak ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                >
                                    <div className="overflow-hidden bg-gray-50">
                                        <div className="p-6 flex flex-wrap justify-center gap-8">
                                            <MemberCard
                                                name="Drs. H. Martono"
                                                imageUrl="images/member_pict_dummy.png"
                                            />
                                            <MemberCard
                                                name="H. Jaenudin, S.Pd, MM"
                                                imageUrl="images/member_pict_dummy.png"
                                            />
                                            <MemberCard
                                                name="H. Didin Hadiat, M.Pd"
                                                imageUrl="images/member_pict_dummy.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* KORD. PENINGKATAN KOMPETENSI */}
                            <div className="border border-green-800 rounded-xl overflow-hidden bg-white shadow-sm">
                                <button
                                    onClick={() => toggleSection("kompetensi")}
                                    className="w-full bg-green-800 hover:bg-green-900 text-white font-bold py-3 text-sm flex justify-between px-4 items-center relative z-10"
                                >
                                    <span className="flex-1 text-center pl-4">
                                        KORD. PENINGKATAN KOMPETENSI
                                    </span>
                                    <span
                                        className={`transition-transform duration-300 ${openSections.kompetensi ? "rotate-180" : ""}`}
                                    >
                                        ▼
                                    </span>
                                </button>
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${openSections.kompetensi ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                >
                                    <div className="overflow-hidden bg-gray-50">
                                        <div className="p-6 flex flex-col items-center gap-6">
                                            <div className="flex flex-wrap justify-center gap-8 w-full">
                                                <MemberCard
                                                    name="Dr. H. Yaya Suhaya, S.Ag. M.Pd."
                                                    imageUrl="images/member_pict_dummy.png"
                                                />
                                                <MemberCard
                                                    name="Drs. Yuhadi, M.Pd."
                                                    imageUrl="images/member_pict_dummy.png"
                                                />
                                                <MemberCard
                                                    name="H. Subandi, M.Pd."
                                                    imageUrl="images/member_pict_dummy.png"
                                                />
                                            </div>
                                            <div className="flex flex-wrap justify-center gap-8 w-full">
                                                <MemberCard
                                                    name="H. Taufik Rahman, MA."
                                                    imageUrl="images/member_pict_dummy.png"
                                                />
                                                <MemberCard
                                                    name="Idris, S.Ag. M.Pd."
                                                    imageUrl="images/member_pict_dummy.png"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* KORD. PROG. LAPORAN & EVALUASI */}
                            <div className="border border-green-800 rounded-xl overflow-hidden bg-white shadow-sm">
                                <button
                                    onClick={() =>
                                        toggleSection("laporan_evaluasi")
                                    }
                                    className="w-full bg-green-800 hover:bg-green-900 text-white font-bold py-3 text-sm flex justify-between px-4 items-center relative z-10"
                                >
                                    <span className="flex-1 text-center pl-4">
                                        KORD. PROG. LAPORAN & EVALUASI
                                    </span>
                                    <span
                                        className={`transition-transform duration-300 ${openSections.laporan_evaluasi ? "rotate-180" : ""}`}
                                    >
                                        ▼
                                    </span>
                                </button>
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${openSections.laporan_evaluasi ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                >
                                    <div className="overflow-hidden bg-gray-50">
                                        <div className="p-6 flex flex-col items-center gap-6">
                                            {/* Baris Atas (3 Orang) */}
                                            <div className="flex flex-wrap justify-center gap-8 w-full">
                                                <MemberCard
                                                    name="Dr. H. Yaya Suhaya, S.Ag. M.Pd."
                                                    imageUrl="images/member_pict_dummy.png"
                                                />
                                                <MemberCard
                                                    name="Drs. Yuhadi, M.Pd."
                                                    imageUrl="images/member_pict_dummy.png"
                                                />
                                                <MemberCard
                                                    name="H. Subandi, M.Pd."
                                                    imageUrl="images/member_pict_dummy.png"
                                                />
                                            </div>
                                            {/* Baris Bawah (2 Orang) */}
                                            <div className="flex flex-wrap justify-center gap-8 w-full">
                                                <MemberCard
                                                    name="H. Taufik Rahman, MA."
                                                    imageUrl="images/member_pict_dummy.png"
                                                />
                                                <MemberCard
                                                    name="Idris, S.Ag. M.Pd."
                                                    imageUrl="images/member_pict_dummy.png"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* KORD. BID. KESEJAHTERAAN SOSIAL & HUBUNGAN MASYARAKAT */}
                            <div className="border border-green-800 rounded-xl overflow-hidden bg-white shadow-sm">
                                <button
                                    onClick={() =>
                                        toggleSection("kesejahteraan_sosial")
                                    }
                                    className="w-full bg-green-800 hover:bg-green-900 text-white font-bold py-3 text-sm flex justify-between px-4 items-center relative z-10"
                                >
                                    <span className="flex-1 text-center pl-4">
                                        KORD. BID. KESEJAHTERAAN SOSIAL &
                                        HUBUNGAN MASYARAKAT
                                    </span>
                                    <span
                                        className={`transition-transform duration-300 ${openSections.kesejahteraan_sosial ? "rotate-180" : ""}`}
                                    >
                                        ▼
                                    </span>
                                </button>
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${openSections.kesejahteraan_sosial ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                >
                                    <div className="overflow-hidden bg-gray-50">
                                        <div className="p-6 flex flex-col items-center gap-6">
                                            <div className="flex flex-wrap justify-center gap-8 w-full">
                                                <MemberCard
                                                    name="Muhammad Nurdin, S.Ag. M.Pd."
                                                    imageUrl="images/member_pict_dummy.png"
                                                />
                                                <MemberCard
                                                    name="H. Dayat Dania, S.Pd.I. MA."
                                                    imageUrl="images/member_pict_dummy.png"
                                                />
                                                <MemberCard
                                                    name="Atmadi, S.Pd.I. M.Si."
                                                    imageUrl="images/member_pict_dummy.png"
                                                />
                                            </div>
                                            <div className="flex flex-wrap justify-center gap-8 w-full">
                                                <MemberCard
                                                    name="Inzal Zulkarnaen, S.Pd. MM."
                                                    imageUrl="images/member_pict_dummy.png"
                                                />
                                                <MemberCard
                                                    name="Vienta Heryani, M.Pd."
                                                    imageUrl="images/member_pict_dummy.png"
                                                />
                                            </div>
                                            <div className="flex flex-wrap justify-center gap-8 w-full">
                                                <MemberCard
                                                    name="H. Abduh Basyith, S.Pd.I"
                                                    imageUrl="images/member_pict_dummy.png"
                                                />
                                                <MemberCard
                                                    name="Drs. Moh Fajeri, M.Si."
                                                    imageUrl="images/member_pict_dummy.png"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- FOOTER --- */}
                <section className="relative pt-40 pb-20 flex justify-center mt-32 mb-10">
                    {/* Gradient background */}
                    <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] h-[120%] 
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
                                <div className="border border-gray-300 rounded-lg p-1 flex items-center gap-2 max-w-xs">
                                    <input
                                        type="email"
                                        placeholder="Masukkan Email"
                                        className="flex-1 px-3 py-2 text-sm outline-none focus:outline-none focus:ring-0 border-none"
                                    />
                                    <button className="bg-green-800 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700">
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
            </div>
        </>
    );
}
