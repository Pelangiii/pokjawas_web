import { Head, Link } from '@inertiajs/react';

export default function Detail({ id }) {
    return (
        <>
            <Head title="Detail Berita" />

            <div className="bg-gray-100 min-h-screen py-20 overflow-hidden relative">
                {/* Background City */}
                    <img
                        src="/images/city_bg.svg"
                        className="absolute bottom-0 left-0 w-full opacity-60 z-0"
                    />

                <div className="relative z-10 max-w-4xl mx-auto bg-white rounded-3xl shadow-md p-10">

                    {/* BACK */}
                    <Link href="/" className="text-green-600 mb-6 inline-block">
                        ← Kembali
                    </Link>


                    {/* TITLE */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Judul Berita ID: {id}
                    </h1>

                    {/* DATE */}
                    <p className="text-gray-400 mb-6">
                        Kamis, 5 Maret 2026
                    </p>

                    {/* IMAGE */}
                    <img
                        src="/images/img_hero_2.png"
                        className="w-full rounded-2xl mb-6"
                    />

                    {/* CONTENT */}
                    <div className="text-gray-700 leading-relaxed space-y-4">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
}