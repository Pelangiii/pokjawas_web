import React, { useState, useRef } from 'react';
import { useForm, router, Head, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Users,
    Newspaper,
    ClipboardCheck,
    Bell,
    LogOut,
    Search,
    Plus,
    Eye,
    Edit3,
    Trash2,
    SearchX,
    ArrowLeft,
    Camera,
    X,
    ChevronRight
} from "lucide-react";

export default function ManagementUser({ users, filters }) {
    const { props, url } = usePage();
    const userAuth = props.auth?.user;
    const [view, setView] = useState('list');
    const [selectedUser, setSelectedUser] = useState(null);
    const [previewPhoto, setPreviewPhoto] = useState(null);
    const [showLogout, setShowLogout] = useState(false);
    const [showNotif, setShowNotif] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        name: '', email: '', password: '', nip: '', phone: '', birth_date: '', address: '', photo: null
    });

    // Helper untuk style menu sidebar (Sama dengan Dashboard)
    const menuClass = (path) => {
        const isActive = url === path || url.startsWith(path);
        return `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 text-[15px]
        ${isActive
                ? "bg-green-100 text-green-700 font-bold shadow-sm"
                : "text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-700"
            }`;
    };

    const handleSearch = (e) => {
        router.get('/users',
            { search: e.target.value, filter: filters.filter },
            { preserveState: true, replace: true }
        );
    };

    const openEdit = (user) => {
        setSelectedUser(user);
        setPreviewPhoto(user.photo ? `/storage/${user.photo}` : null);
        setData({
            name: user.name,
            email: user.email,
            nip: user.nip || '',
            phone: user.phone || '',
            birth_date: user.birth_date || '',
            address: user.address || '',
            photo: null
        });
        setView('edit');
    };

    const submitAction = (e) => {
        e.preventDefault();
        const options = {
            onSuccess: () => { setView('list'); reset(); setPreviewPhoto(null); },
            forceFormData: true
        };

        if (view === 'add') {
            post('/users', options);
        } else {
            router.post(`/users/${selectedUser.id}`, { ...data, _method: 'PUT' }, options);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F4F6FA] font-sans text-gray-900">
            <Head title="Manajemen User" />

            {/* ================= MODAL LOGOUT ================= */}
            {showLogout && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
                        <h2 className="text-lg font-bold mb-2">Konfirmasi Logout</h2>
                        <p className="text-sm text-gray-500 mb-5">Kamu yakin mau keluar?</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowLogout(false)} className="px-4 py-2 rounded-lg border font-semibold text-sm">Batal</button>
                            <button onClick={() => router.post('/logout')} className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold text-sm">Logout</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= SIDEBAR ================= */}
            <aside className="w-64 bg-white border-r flex flex-col justify-between p-6 fixed h-full shadow-sm z-50">
                <div>
                    <div className="flex items-center gap-3 mb-10">
                        <img src="/images/pokjawas.png" className="w-10 h-10 object-contain" alt="Logo" />
                        <div>
                            <h1 className="font-bold text-gray-800 leading-tight text-sm">Pokjawas Kemenag</h1>
                            <p className="text-[10px] text-gray-400 font-medium">Kabupaten Tangerang</p>
                        </div>
                    </div>

                    <p className="text-[10px] text-gray-400 mb-4 uppercase font-bold tracking-widest px-2">Menu Utama</p>
                    <nav className="space-y-1">
                        <div onClick={() => router.get('/admin/dashboard')} className={menuClass('/admin/dashboard')}>
                            <LayoutDashboard size={18} /> Dashboard
                        </div>
                        <div onClick={() => router.get('/users')} className={menuClass('/users')}>
                            <Users size={18} /> Manajemen User
                        </div>
                        <div onClick={() => router.get('/berita')} className={menuClass('/admin/berita')}>
                            <Newspaper size={18} /> Manajemen Berita
                        </div>
                        <div onClick={() => router.get('/admin/verifikasi')} className={menuClass('/admin/verifikasi')}>
                            <ClipboardCheck size={18} /> Verifikasi Laporan
                        </div>
                    </nav>
                </div>

                <button onClick={() => setShowLogout(true)} className="flex items-center gap-2 px-4 py-3 text-gray-400 hover:text-red-500 transition font-bold text-sm">
                    <LogOut size={18} /> Logout
                </button>
            </aside>

            {/* ================= MAIN CONTENT ================= */}
            <main className="flex-1 ml-64">

                {/* NAVBAR */}
                <div className="flex justify-between items-center px-8 py-6 bg-white border-b sticky top-0 z-40 shadow-sm">
                    <h1 className="text-3xl font-black text-gray-800 tracking-tight">Manajemen User</h1>

                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Bell size={20} className="cursor-pointer text-gray-400 hover:text-green-600 transition" onClick={() => setShowNotif(!showNotif)} />
                            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </div>

                        <div className="h-6 w-px bg-gray-200"></div>

                        <div className="flex items-center gap-3 cursor-pointer group">
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-800">{userAuth?.name || "Admin"}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-[8px]">Administrator</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-green-700 text-white flex items-center justify-center font-bold">
                                {userAuth?.name?.charAt(0) || "A"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTENT AREA */}
                <div className="p-8">
                    {view === 'list' && (
                        <div className="animate-in fade-in duration-500">
                            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                                <div className="flex gap-3 w-full md:w-auto">
                                    <div className="relative flex-1 md:w-80">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Cari nama user..."
                                            className="w-full bg-white border-none rounded-2xl pl-12 pr-5 py-3 font-bold shadow-sm focus:ring-2 focus:ring-green-800"
                                            defaultValue={filters.search}
                                            onChange={handleSearch}
                                        />
                                    </div>

                                    <div className="relative">
                                        <select
                                            className="appearance-none bg-white border-none rounded-2xl pl-5 pr-12 py-3 font-bold shadow-sm focus:ring-2 focus:ring-green-800 text-gray-700 cursor-pointer w-full md:w-auto"
                                            value={filters.filter || 'latest'}
                                            onChange={(e) => router.get('/users', { ...filters, filter: e.target.value }, { preserveState: true })}
                                        >
                                            <option value="latest">Terbaru</option>
                                            <option value="oldest">Terlama</option>
                                            <option value="az">A - Z</option>
                                            <option value="za">Z - A</option>
                                        </select>
                                    </div>
                                </div>

                                <button onClick={() => { reset(); setPreviewPhoto(null); setView('add'); }} className="bg-green-800 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-green-900/10 hover:bg-green-900 transition w-full md:w-auto justify-center">
                                    <Plus size={18} /> Tambah User
                                </button>
                            </div>

                            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                                <div className="grid gap-4">
                                    {users.length > 0 ? users.map((u) => (
                                        <div key={u.id} className="flex items-center justify-between p-5 bg-white border border-gray-50 rounded-[24px] hover:shadow-md transition-all group">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
                                                    <img
                                                        src={u.photo ? `/storage/${u.photo}` : `https://ui-avatars.com/api/?name=${u.name}`}
                                                        className="w-full h-full object-cover"
                                                        alt={u.name}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-lg text-gray-800">{u.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">NIP: {u.nip || '---'}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => { setSelectedUser(u); setView('detail'); }} className="p-3 text-blue-500 hover:bg-blue-50 rounded-xl transition"><Eye size={20} /></button>
                                                <button onClick={() => openEdit(u)} className="p-3 text-amber-500 hover:bg-amber-50 rounded-xl transition"><Edit3 size={20} /></button>
                                                <button onClick={() => { if (confirm('Hapus user ini?')) router.delete(`/users/${u.id}`) }} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition"><Trash2 size={20} /></button>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="text-center py-20">
                                            <SearchX size={48} className="mx-auto text-gray-200 mb-4" />
                                            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">User tidak ditemukan</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* MODAL ADD / EDIT */}
                    {(view === 'add' || view === 'edit') && (
                        <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-50 relative animate-in zoom-in duration-300">
                            <button onClick={() => setView('list')} className="absolute top-8 left-8 p-2 text-gray-300 hover:text-gray-800 transition"><ArrowLeft size={24} /></button>
                            <h3 className="text-2xl font-black text-center mb-10 text-gray-800">{view === 'add' ? 'Tambah User Baru' : 'Perbarui Data User'}</h3>

                            <form onSubmit={submitAction} className="space-y-4">
                                <div className="flex justify-center mb-8">
                                    <label className="w-28 h-28 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden hover:border-green-500 transition">
                                        {data.photo ? (
                                            <img src={URL.createObjectURL(data.photo)} className="w-full h-full object-cover" />
                                        ) : previewPhoto ? (
                                            <img src={previewPhoto} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-center"><Camera className="text-gray-300 mx-auto mb-1" /><p className="text-[8px] font-bold text-gray-300">UPLOAD FOTO</p></div>
                                        )}
                                        <input type="file" className="hidden" onChange={e => setData('photo', e.target.files[0])} />
                                    </label>
                                </div>

                                <input type="text" placeholder="Nama Lengkap" value={data.name} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 font-bold" onChange={e => setData('name', e.target.value)} required />

                                <div className="grid grid-cols-2 gap-4">
                                    <input type="email" placeholder="Email Address" value={data.email} className="p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 font-bold" onChange={e => setData('email', e.target.value)} required />
                                    <input type="password" placeholder={view === 'edit' ? "Kosongkan jika tak diubah" : "Password"} className="p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 font-bold" onChange={e => setData('password', e.target.value)} required={view === 'add'} />
                                    <input type="text" placeholder="NIP Pegawai" value={data.nip} className="p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 font-bold" onChange={e => setData('nip', e.target.value)} />
                                    <input type="text" placeholder="Nomor Telepon" value={data.phone} className="p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 font-bold" onChange={e => setData('phone', e.target.value)} />
                                </div>

                                <div className="bg-gray-50 p-4 rounded-2xl">
                                    <p className="text-[10px] font-bold text-gray-400 mb-1 uppercase ml-1">Tanggal Lahir</p>
                                    <input type="date" value={data.birth_date} className="w-full bg-transparent border-none p-0 text-gray-600 focus:ring-0 font-bold" onChange={e => setData('birth_date', e.target.value)} />
                                </div>

                                <textarea placeholder="Alamat Lengkap" value={data.address} className="w-full p-4 bg-gray-50 border-none rounded-2xl h-24 focus:ring-2 focus:ring-green-500 font-bold" onChange={e => setData('address', e.target.value)}></textarea>

                                <button type="submit" disabled={processing} className="w-full bg-green-800 text-white py-5 rounded-2xl font-black text-lg mt-4 shadow-xl shadow-green-900/20 uppercase tracking-widest hover:bg-green-900 transition">Simpan Data</button>
                            </form>
                        </div>
                    )}

                    {/* DETAIL VIEW */}
                    {view === 'detail' && selectedUser && (
                        <div className="max-w-3xl mx-auto bg-white rounded-[3rem] p-16 shadow-2xl border border-gray-50 text-center relative animate-in slide-in-from-bottom-8 duration-500">
                            <button onClick={() => setView('list')} className="absolute top-10 left-10 text-gray-300 hover:text-gray-800 transition"><X size={30} /></button>
                            <div className="w-44 h-44 bg-gray-100 rounded-[3rem] mx-auto mb-8 overflow-hidden border-8 border-white shadow-2xl">
                                <img
                                    src={selectedUser.photo ? `/storage/${selectedUser.photo}` : `https://ui-avatars.com/api/?name=${selectedUser.name}`}
                                    className="w-full h-full object-cover"
                                    alt={selectedUser.name}
                                />
                            </div>
                            <h2 className="text-4xl font-black mb-12 tracking-tight text-gray-800">{selectedUser.name}</h2>
                            <div className="grid grid-cols-2 gap-4 text-left">
                                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">NIP Pegawai</p>
                                    <p className="font-bold text-gray-700 text-lg">{selectedUser.nip || '---'}</p>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Nomor Telepon</p>
                                    <p className="font-bold text-gray-700 text-lg">{selectedUser.phone || '---'}</p>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Alamat Email</p>
                                    <p className="font-bold text-gray-700 text-lg truncate">{selectedUser.email}</p>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Tanggal Lahir</p>
                                    <p className="font-bold text-gray-700 text-lg">{selectedUser.birth_date || '---'}</p>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 col-span-2">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Alamat Lengkap</p>
                                    <p className="font-bold text-gray-700 text-lg leading-snug">{selectedUser.address || '---'}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}