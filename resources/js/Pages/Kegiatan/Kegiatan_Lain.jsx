import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { InstagramIcon, YoutubeIcon, FacebookIcon } from "@/Components/icon";

export default function Index() {
    const [isOpen, setIsOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const [open, setOpen] = useState(null);

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
            { threshold: 0.15 },
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Head title="Kegiatan" />

            <section className="pb-16 bg-gray-100 min-h-screen overflow-hidden relative font-jakarta">
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
                                className="hover:text-green-600 hover:font-bold transition duration-300"
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
                                className="text-green-600 font-bold transition duration-300"
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
                                    className="text-gray-700 p-3"
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
                                    className="text-green-600 font-bold bg-green-50 p-3 rounded-lg"
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
                            <div
                                key={item}
                                className="bg-white rounded-2xl shadow-md overflow-hidden group"
                            >
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
                                        Lorem ipsum Lorem ipsum Lorem ipsum
                                        Lorem ipsum Lorem ipsum
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
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
