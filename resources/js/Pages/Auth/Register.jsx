import { Head, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <div>
            <Head title="Register" />

            <div className="relative w-full bg-white rounded-xl flex flex-col items-center md:px-20 min-h-[800px]">

                {/* BUTTON BACK */}
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="absolute top-8 left-8 flex items-center gap-3 border border-slate-700 text-slate-700 px-6 py-3 rounded-full hover:bg-slate-100 transition text-sm font-medium"
                >
                    ← Kembali Halaman
                </button>

                {/* LOGO */}
                <div className="mt-10 mb-6">
                    <img 
                        src="/images/pokjawas.png"
                        className="w-28"
                    />
                </div>

                {/* TITLE */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748]">
                        Pokjawas Kemenag
                    </h2>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748]">
                        Kabupaten Tangerang
                    </h2>
                </div>

                {/* BACKGROUND */}
                <div 
                    className="absolute bottom-1 w-full h-2/3"
                    style={{ backgroundImage: "url('/images/gedung.png')" }}
                ></div>

                {/* FORM */}
                <form onSubmit={submit} className="w-full max-w-md space-y-4 relative z-10">

                    <input
                        type="text"
                        placeholder="Name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl border shadow-sm"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

                    <input
                        type="email"
                        placeholder="E-mail"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl border shadow-sm"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

                    <input
                        type="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl border shadow-sm"
                    />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

                    <input
                        type="password"
                        placeholder="Konfirmasi Password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl border shadow-sm"
                    />

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#2D5A47] text-white px-10 py-2.5 rounded-xl hover:bg-[#234738] shadow-lg font-semibold disabled:opacity-50"
                        >
                            {processing ? 'Loading...' : 'Register'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}