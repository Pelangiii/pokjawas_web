import React, { useState, useEffect } from 'react';
import { router, useForm } from '@inertiajs/react';


export default function ManagementUser({ users, filters }) {
    const [view, setView] = useState('list'); // list, detail, add, edit
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    // Form Object
    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        name: '', email: '', password: '', nip: '', phone: '', birth_date: '', address: ''
    });

    // --- Fungsi CRUD ---
    const handleAdd = (e) => {
        e.preventDefault();
        post(route('users.store'), {
            onSuccess: () => { setView('list'); reset(); }
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route('users.update', selectedUser.id), {
            onSuccess: () => { setView('list'); reset(); }
        });
    };

    const handleDelete = (id) => {
        if (confirm('Hapus user ini?')) {
            router.delete(route('users.destroy', id));
        }
    };

    const handleFilter = (type) => {
        router.get(route('users.index'), { filter: type, search: searchTerm }, { preserveState: true });
    };

    return (
        <div className="flex min-h-screen bg-[#F8F9FA]">
            {/* Sidebar Tetap Sama */}
            

            <main className="flex-1 p-8">
                {/* Header Profile */}
                

                {/* --- LIST VIEW --- */}
                {view === 'list' && (
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <div className="flex justify-between mb-6 gap-4">
                            <input 
                                type="text" placeholder="Search user..." 
                                className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-2"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyUp={(e) => e.key === 'Enter' && router.get(route('users.index'), { search: searchTerm })}
                            />
                            <div className="flex gap-2">
                                <button onClick={() => setView('add')} className="bg-emerald-800 text-white px-4 rounded-xl">+</button>
                                <select onChange={(e) => handleFilter(e.target.value)} className="border-none bg-gray-50 rounded-xl text-sm">
                                    <option value="latest">Terbaru</option>
                                    <option value="oldest">Terlama</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {users.map((user) => (
                                <div key={user.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition">
                                    <div className="flex items-center gap-4">
                                        {/* FOTO PROFIL DENGAN INITIAL */}
                                        <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center font-bold text-slate-500 relative">
                                            {user.name.charAt(0)}
                                            <div className="absolute top-0 left-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                                        </div>
                                        <span className="font-semibold text-slate-700">{user.name}</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={() => { setSelectedUser(user); setView('detail'); }} className="p-2 text-blue-500">👁️</button>
                                        <button onClick={() => { setSelectedUser(user); setData(user); setView('edit'); }} className="p-2 text-amber-500">✏️</button>
                                        <button onClick={() => handleDelete(user.id)} className="p-2 text-red-500">🗑️</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- ADD / EDIT FORM --- */}
                {(view === 'add' || view === 'edit') && (
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-lg border relative">
                        <button onClick={() => setView('list')} className="absolute top-6 left-6 font-bold">✕</button>
                        <h3 className="text-center text-xl font-bold mb-8">{view === 'add' ? 'Tambah User' : 'Edit User'}</h3>
                        
                        <form onSubmit={view === 'add' ? handleAdd : handleUpdate} className="space-y-4">
                            <input type="text" placeholder="Nama Lengkap" className="w-full p-3 bg-gray-50 border rounded-xl" value={data.name} onChange={e => setData('name', e.target.value)} />
                            {view === 'add' && <input type="email" placeholder="Email" className="w-full p-3 bg-gray-50 border rounded-xl" value={data.email} onChange={e => setData('email', e.target.value)} />}
                            {view === 'add' && <input type="password" placeholder="Password" className="w-full p-3 bg-gray-50 border rounded-xl" value={data.password} onChange={e => setData('password', e.target.value)} />}
                            <input type="text" placeholder="NIP" className="w-full p-3 bg-gray-50 border rounded-xl" value={data.nip} onChange={e => setData('nip', e.target.value)} />
                            <input type="text" placeholder="Nomor Telpon" className="w-full p-3 bg-gray-50 border rounded-xl" value={data.phone} onChange={e => setData('phone', e.target.value)} />
                            
                            <button type="submit" disabled={processing} className="w-full bg-emerald-800 text-white py-4 rounded-full font-bold">
                                {view === 'add' ? 'Tambah Pegawai' : 'Simpan Perubahan'}
                            </button>
                        </form>
                    </div>
                )}

                {/* --- DETAIL VIEW --- */}
                {view === 'detail' && selectedUser && (
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl p-10 shadow-lg text-center border">
                        <div className="w-32 h-32 bg-slate-800 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                            {selectedUser.name.charAt(0)}
                        </div>
                        <h2 className="text-2xl font-bold mb-8">{selectedUser.name}</h2>
                        <div className="grid grid-cols-2 gap-4 text-left">
                            <div className="p-3 bg-gray-50 rounded-xl"><p className="text-[10px] text-gray-400">NIP</p>{selectedUser.nip || '-'}</div>
                            <div className="p-3 bg-gray-50 rounded-xl"><p className="text-[10px] text-gray-400">EMAIL</p>{selectedUser.email}</div>
                            <div className="p-3 bg-gray-50 rounded-xl"><p className="text-[10px] text-gray-400">TELPON</p>{selectedUser.phone || '-'}</div>
                            <div className="p-3 bg-gray-50 rounded-xl"><p className="text-[10px] text-gray-400">TG LAHIR</p>{selectedUser.birth_date || '-'}</div>
                        </div>
                        <button onClick={() => setView('list')} className="mt-8 bg-emerald-800 text-white px-8 py-2 rounded-xl font-bold">Kembali</button>
                    </div>
                )}
            </main>
        </div>
    );
}