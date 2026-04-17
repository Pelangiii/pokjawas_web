import { Head, Link } from '@inertiajs/react';

export default function Index() {
    const berita = [1, 2, 3, 4, 5, 6];

    return (
        <>
            <Head title="Berita" />

            <section className="py-16 bg-gray-100 min-h-screen overflow-hidden relative">

                {/* Background City */}
                <img
                    src="/images/city_bg.svg"
                    className="absolute bottom-0 left-0 w-full opacity-60 z-0"
                />

                <div className="max-w-6xl mx-auto px-6 relative z-10">

                    {/* BACK BUTTON */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 border-2 border-green-800 text-gray-800 px-5 py-2 rounded-2xl hover:bg-green-800 hover:text-white transition mb-10"
                    >
                        ← Kembali Halaman
                    </Link>

                    {/* TITLE */}
                    <div className="text-center mb-14 relative inline-block w-full">
                        <h2 className="text-3xl font-bold text-gray-800 relative inline-block">
                            Berita Lainnya

                            <span className="absolute -left-10 top-0 w-6 h-6 border-l-4 border-t-4 border-green-800"></span>
                            <span className="absolute -right-10 bottom-0 w-6 h-6 border-r-4 border-b-4 border-green-800"></span>
                        </h2>
                    </div>

                    {/* GRID */}
                    <div className="grid md:grid-cols-3 gap-8">

                        {berita.map((item) => (
                            <div key={item} className="bg-white rounded-2xl shadow-md overflow-hidden group">

                                {/* IMAGE */}
                                <div className="relative overflow-hidden">
                                    <img
                                        src={`/images/img_hero_${(item % 3) + 1}.png`}
                                        className="w-full h-48 object-cover transition duration-500 group-hover:scale-110"
                                    />

                                    {/* LINK KE DETAIL BERITA */}
                                    <Link
                                        href={route('berita.detail', item)}
                                        className="absolute top-3 right-3 bg-green-800 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg hover:scale-110 transition"
                                    >
                                        ↗
                                    </Link>
                                </div>

                                {/* TEXT */}
                                <div className="p-5">
                                    <p className="text-green-600 text-sm mb-1">
                                        Pers Rilis
                                    </p>

                                    <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-green-700 transition">
                                        Judul Berita {item}
                                    </h3>

                                    <p className="text-gray-500 text-sm">
                                        Rabu, 4 Maret 2026
                                    </p>
                                </div>

                            </div>
                        ))}

                    </div>

                </div>
            </section>
        </>
    );
}