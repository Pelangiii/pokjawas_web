import { Head, Link } from '@inertiajs/react';

export default function Detail({ id }) {
    return (
        <>
            <Head title="Detail Kegiatan" />

            <div className="relative bg-gray-100 min-h-screen py-20 overflow-hidden">

                {/* Background */}
                <img
                    src="/images/city_bg.svg"
                    className="absolute bottom-0 left-0 w-full opacity-40 z-0 pointer-events-none"
                />

                <div className="relative z-10 max-w-4xl mx-auto bg-white rounded-3xl shadow-md p-10">

                    <Link href="/" className="text-green-600 mb-6 inline-block">
                        ← Kembali
                    </Link>

                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Detail Kegiatan ID: {id}
                    </h1>

                    <p className="text-gray-400 mb-6">
                        Kamis, 5 Maret 2026
                    </p>

                    <img
                        src="/images/img_hero_3.png"
                        className="w-full rounded-2xl mb-6"
                    />

                    <div className="text-gray-700 leading-relaxed space-y-4">
                        <p>
                            Ini adalah halaman detail kegiatan. Nanti bisa ambil dari database.
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
}