// import Checkbox from '@/Components/Checkbox';
// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// import PrimaryButton from '@/Components/PrimaryButton';
// import TextInput from '@/Components/TextInput';
// import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '', // Gunakan email sesuai logic backend Anda
        password: '',

    });

    

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div 
        >
            <Head title="Login" />

            {/* Container Putih Utama */}
            <div className="relative w-full  bg-white rounded-xl flex flex-col items-center md:px-20 min-h-[800px]">
                
                {/* Tombol Kembali Halaman (Pojok Kiri Atas di dalam box) */}
                <button className="absolute top-8 left-8 flex items-center gap-3 border border-slate-700 text-slate-700 px-6 py-3 rounded-full hover:bg-slate-100 transition text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali Halaman
                </button>

                {/* Logo Kemenag */}
                <div className="mt-10 mb-6">
                    <img 
                        src="/images/pokjawas.png"
                        alt="Logo Kemenag"
                        className="w-28 h-auto"
                    />
                </div>

                {/* Judul Teks */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748]">Pokjawas Kemenag</h2>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748]">Kabupaten Tangerang</h2>
                </div>

                {/* Background Gedung Abu-abu Tipis (Sesuai Gambar) */}
               <div 
    className="absolute bottom-1 left-0 h w-full h-2/3 bg-contain"
    style={{ backgroundImage: "url('/images/gedung.png')" }}
></div>

                {/* Form Login */}
                <form onSubmit={submit} className="w-full max-w-md space-y-4 relative z-10">
                    <div>
                        <input
                            type="email"
                            placeholder="Username"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400 transition"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1 ml-2">{errors.email}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400 transition"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1 ml-2">{errors.password}</p>}
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#2D5A47] text-white px-10 py-2.5 rounded-xl hover:bg-[#234738] shadow-lg transition-all font-semibold"
                        >
                            Login
                        </button>
                    </div>
                </form>

                {status && (
                    <div className="mt-4 text-green-600 text-sm font-medium">
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
}