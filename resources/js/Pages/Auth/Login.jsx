import { Head, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onSuccess: () => {
                reset('password');
            },
            onError: (errors) => {
                console.log('Login gagal:', errors);
            }
        });
    };

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            <Head title="Login" />

            <div className="relative w-full flex flex-col items-center px-4 sm:px-6 md:px-10 min-h-screen">

                {/* BUTTON BACK */}
                <button
                    onClick={() => window.location.href = '/'}
                    className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 border border-slate-700 text-slate-700 px-3 sm:px-5 py-2 rounded-full hover:bg-slate-100 transition text-[10px] sm:text-sm font-medium z-20 bg-white/80"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 sm:h-4 sm:w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>

                    Kembali Halaman
                </button>

                {/* LOGO */}
                <div className="mt-20 sm:mt-16 md:mt-10 mb-5 sm:mb-6 relative z-10">
                    <img
                        src="/images/pokjawas.png"
                        alt="Logo Kemenag"
                        className="w-24 sm:w-28 md:w-32 h-auto mx-auto"
                    />
                </div>

                {/* TITLE */}
                <div className="text-center mb-8 sm:mb-10 relative z-10 px-2">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D3748] leading-tight">
                        Pokjawas Kemenag
                    </h2>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D3748] leading-tight">
                        Kabupaten Tangerang
                    </h2>
                </div>

                {/* GEDUNG */}
               <div
    className="absolute bottom-0 left-0 w-full h-[55%] sm:h-[70%] bg-cover bg-no-repeat bg-bottom opacity-100"
    style={{
        backgroundImage: "url('/images/city.png')"
    }}
></div>

                {/* FORM */}
                <form
                    onSubmit={submit}
                    className="w-full max-w-md space-y-4 relative z-10 px-1"
                >

                    {/* EMAIL */}
                    <div>
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-5 sm:px-6 py-3 sm:py-4 rounded-2xl bg-white border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm sm:text-base text-gray-700 placeholder-gray-400 transition"
                        />

                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1 ml-2">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-5 sm:px-6 py-3 sm:py-4 rounded-2xl bg-white border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm sm:text-base text-gray-700 placeholder-gray-400 transition"
                        />

                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1 ml-2">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* BUTTON */}
                    <div className="flex justify-center sm:justify-end pt-3 sm:pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#2D5A47] text-white w-full sm:w-auto px-10 py-3 rounded-xl hover:bg-[#234738] shadow-lg transition-all font-semibold text-sm sm:text-base"
                        >
                            {processing ? 'Loading...' : 'Login'}
                        </button>
                    </div>
                </form>

                {/* STATUS */}
                {status && (
                    <div className="mt-4 text-green-600 text-sm font-medium relative z-10">
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
}