import React, { useState } from 'react';
import { useForm, router, Head } from '@inertiajs/react';
import * as Lucide from 'lucide-react';

export default function ManagementUser({ users, filters }) {
    const [view, setView] = useState('list');
    const [selectedUser, setSelectedUser] = useState(null);
    const [previewPhoto, setPreviewPhoto] = useState(null);

    const { data, setData, post, processing, reset } = useForm({
        name: '', email: '', password: '', nip: '', phone: '', birth_date: '', address: '', photo: null
    });

    const Icon = ({ name, size = 20, className = "" }) => {
        const LucideIcon = Lucide[name];
        return LucideIcon ? <LucideIcon size={size} className={className} /> : null;
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
        <div className="flex min-h-screen bg-[#F8F9FA] p-10 font-sans text-slate-700">
            <Head title="Manajemen User" />
            <div className="max-w-6xl mx-auto w-full">

                {view === 'list' && (
                    <>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                            <div>
                                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Manajemen User</h2>
                                <p className="text-slate-400 font-medium">Kelola data anggota tim kamu di sini.</p>
                            </div>

                            <div className="flex flex-wrap gap-3 w-full md:w-auto">
                                <div className="relative flex-grow md:flex-grow-0">
                                    <input
                                        type="text"
                                        placeholder="Cari nama user..."
                                        className="w-full md:w-64 bg-white border-none rounded-2xl pl-12 pr-5 py-3 font-bold shadow-sm focus:ring-2 focus:ring-emerald-500"
                                        defaultValue={filters.search}
                                        onChange={handleSearch}
                                    />
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-300">
                                        <Icon name="Search" size={18} />
                                    </div>
                                </div>

                                <div className="relative inline-block">
                                    <select
                                        className="appearance-none !bg-none bg-white border-none rounded-2xl pl-5 pr-12 py-3 font-bold shadow-sm cursor-pointer focus:ring-2 focus:ring-emerald-500 text-slate-700"
                                        value={filters.filter || 'latest'}
                                        onChange={(e) => router.get('/users', { ...filters, filter: e.target.value }, { preserveState: true })}
                                        style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                                    >
                                        <option value="latest">Terbaru</option>
                                        <option value="oldest">Terlama</option>
                                        <option value="az">A - Z</option>
                                        <option value="za">Z - A</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                    </div>
                                </div>

                                <button onClick={() => { reset(); setPreviewPhoto(null); setView('add'); }} className="bg-emerald-800 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-900/10">
                                    <Icon name="Plus" size={18} /> Tambah
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
                            <div className="grid gap-4">
                                {users.length > 0 ? users.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between p-5 bg-white border border-gray-50 rounded-[24px] hover:shadow-xl transition-all">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 bg-slate-100 rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
                                                <img
                                                    src={user.photo ? `/storage/${user.photo}` : `https://ui-avatars.com/api/?name=${user.name}`}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${user.name}` }}
                                                />
                                            </div>
                                            <div>
                                                <p className="font-bold text-lg text-slate-800">{user.name}</p>
                                                <p className="text-xs text-gray-400 font-black uppercase tracking-widest">NIP: {user.nip || '---'}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => { setSelectedUser(user); setView('detail'); }} className="p-3 text-blue-500 hover:bg-blue-50 rounded-xl transition"><Icon name="Eye" /></button>
                                            <button onClick={() => openEdit(user)} className="p-3 text-amber-500 hover:bg-amber-50 rounded-xl transition"><Icon name="Edit3" /></button>
                                            <button onClick={() => { if (confirm('Hapus user ini?')) router.delete(`/users/${user.id}`) }} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition"><Icon name="Trash2" /></button>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-10">
                                        <Icon name="SearchX" size={48} className="mx-auto text-slate-200 mb-4" />
                                        <p className="text-slate-400 font-bold uppercase tracking-widest">User tidak ditemukan</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {(view === 'add' || view === 'edit') && (
                    <div className="max-w-2xl mx-auto bg-white rounded-[40px] p-12 shadow-2xl border border-gray-50 relative animate-in fade-in zoom-in duration-300">
                        <button onClick={() => setView('list')} className="absolute top-10 left-10 p-2 text-gray-300 hover:text-slate-800 transition"><Icon name="ArrowLeft" size={24} /></button>
                        <h3 className="text-2xl font-black text-center mb-10 text-slate-800">{view === 'add' ? 'Tambah User Baru' : 'Perbarui Data User'}</h3>

                        <form onSubmit={submitAction} className="space-y-4">
                            <div className="flex justify-center mb-8">
                                <label className="w-28 h-28 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group hover:border-emerald-500 transition-colors">
                                    {data.photo ? (
                                        <img src={URL.createObjectURL(data.photo)} className="w-full h-full object-cover" />
                                    ) : previewPhoto ? (
                                        <img src={previewPhoto} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center"><Icon name="Camera" className="text-gray-300 mx-auto mb-1" /><p className="text-[10px] font-bold text-gray-300">UPLOAD FOTO</p></div>
                                    )}
                                    <input type="file" className="hidden" onChange={e => setData('photo', e.target.files[0])} />
                                </label>
                            </div>

                            <input type="text" placeholder="Nama Lengkap" value={data.name} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-bold" onChange={e => setData('name', e.target.value)} required />

                            <div className="grid grid-cols-2 gap-4">
                                <input type="email" placeholder="Email Address" value={data.email} className="p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-bold" onChange={e => setData('email', e.target.value)} required />
                                <input type="password" placeholder={view === 'edit' ? "Kosongkan jika tak diubah" : "Password"} className="p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-bold" onChange={e => setData('password', e.target.value)} required={view === 'add'} />
                                <input type="text" placeholder="NIP Pegawai" value={data.nip} className="p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-bold" onChange={e => setData('nip', e.target.value)} />
                                <input type="text" placeholder="Nomor Telepon" value={data.phone} className="p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-bold" onChange={e => setData('phone', e.target.value)} />
                            </div>

                            <div className="bg-gray-50 p-4 rounded-2xl">
                                <p className="text-[10px] font-bold text-gray-400 mb-2 uppercase ml-1">Tanggal Lahir</p>
                                <input type="date" value={data.birth_date} className="w-full bg-transparent border-none p-0 text-slate-600 focus:ring-0 font-bold" onChange={e => setData('birth_date', e.target.value)} />
                            </div>

                            <textarea placeholder="Alamat Lengkap" value={data.address} className="w-full p-4 bg-gray-50 border-none rounded-2xl h-24 focus:ring-2 focus:ring-emerald-500 font-bold" onChange={e => setData('address', e.target.value)}></textarea>

                            <button type="submit" disabled={processing} className="w-full bg-emerald-800 text-white py-5 rounded-2xl font-black text-lg mt-4 shadow-xl shadow-emerald-900/20 uppercase tracking-widest hover:bg-emerald-900 transition-colors">Simpan Perubahan</button>
                        </form>
                    </div>
                )}

                {view === 'detail' && selectedUser && (
                    <div className="max-w-3xl mx-auto bg-white rounded-[40px] p-16 shadow-2xl border border-gray-50 text-center relative animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <button onClick={() => setView('list')} className="absolute top-10 left-10 text-gray-300 hover:text-slate-800 transition"><Icon name="X" size={30} /></button>
                        <div className="w-44 h-44 bg-slate-100 rounded-[48px] mx-auto mb-8 overflow-hidden border-8 border-white shadow-2xl">
                            <img
                                src={selectedUser.photo ? `/storage/${selectedUser.photo}` : `https://ui-avatars.com/api/?name=${selectedUser.name}`}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${selectedUser.name}` }}
                            />
                        </div>
                        <h2 className="text-4xl font-black mb-12 tracking-tight text-slate-800">{selectedUser.name}</h2>
                        <div className="grid grid-cols-2 gap-4 text-left">
                            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">NIP Pegawai</p>
                                <p className="font-bold text-slate-700 text-lg">{selectedUser.nip || '---'}</p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Nomor Telepon</p>
                                <p className="font-bold text-slate-700 text-lg">{selectedUser.phone || '---'}</p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Tanggal Lahir</p>
                                <p className="font-bold text-slate-700 text-lg">{selectedUser.birth_date || '---'}</p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Alamat Domisili</p>
                                <p className="font-bold text-slate-700 text-lg leading-snug">{selectedUser.address || '---'}</p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 col-span-2 text-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Alamat Email Resmi</p>
                                <p className="font-bold text-slate-700 text-xl">{selectedUser.email}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}