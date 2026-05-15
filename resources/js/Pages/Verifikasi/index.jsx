import { router } from "@inertiajs/react";

export default function Index({ laporans }) {

    const updateStatus = (id, status) => {

        const feedback = prompt("Masukkan feedback admin:");

        router.patch(`/verifikasilaporan/${id}/status`, {
            status,
            feedback,
        });
    };

    return (
        <div className="p-8">

            <h1 className="text-3xl font-bold mb-8">
                Verifikasi Laporan
            </h1>

            <div className="space-y-4">

                {laporans.map((item) => (

                    <div
                        key={item.id}
                        className="bg-white rounded-2xl p-5 shadow border"
                    >

                        <div className="flex justify-between items-start">

                            <div>

                                <h2 className="text-xl font-bold">
                                    {item.title}
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    {item.description}
                                </p>

                                <div className="mt-3 text-sm text-gray-400">
                                    User:
                                    <span className="font-semibold ml-1">
                                        {item.user?.name}
                                    </span>
                                </div>

                                <div className="mt-1 text-sm">
                                    Status:
                                    <span className="font-bold ml-1 capitalize">
                                        {item.status}
                                    </span>
                                </div>

                                {item.feedback && (
                                    <div className="mt-2 text-sm text-red-500">
                                        Feedback:
                                        <span className="ml-1">
                                            {item.feedback}
                                        </span>
                                    </div>
                                )}

                            </div>

                            {item.image && (
                                <img
                                    src={`/storage/${item.image}`}
                                    alt="laporan"
                                    className="w-32 h-24 object-cover rounded-xl"
                                />
                            )}

                        </div>

                        <div className="flex gap-3 mt-5">

                            <button
                                onClick={() => updateStatus(item.id, 'diterima')}
                                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold transition"
                            >
                                Terima
                            </button>

                            <button
                                onClick={() => updateStatus(item.id, 'revisi')}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl font-semibold transition"
                            >
                                Revisi
                            </button>

                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
}