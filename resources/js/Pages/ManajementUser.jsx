import React, { useState } from 'react';
import { useForm, router, Head, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';

import {
    Bell,
    Search,
    Plus,
    Eye,
    Edit3,
    Trash2,
    SearchX,
    ArrowLeft,
    Camera,
    X
} from "lucide-react";

export default function ManagementUser({ users, filters }) {

    const { props } = usePage();
    const userAuth = props.auth?.user;

    const [view, setView] = useState('list');
    const [selectedUser, setSelectedUser] = useState(null);
    const [previewPhoto, setPreviewPhoto] = useState(null);
    const [showLogout, setShowLogout] = useState(false);
    const [showNotif, setShowNotif] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        password: '',
        nip: '',
        phone: '',
        birth_date: '',
        address: '',
        photo: null
    });

    const handleSearch = (e) => {
        router.get('/users',
            {
                search: e.target.value,
                filter: filters.filter
            },
            {
                preserveState: true,
                replace: true
            }
        );
    };

    const openEdit = (user) => {
        setSelectedUser(user);

        setPreviewPhoto(
            user.photo
                ? `/storage/${user.photo}`
                : null
        );

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
            onSuccess: () => {
                setView('list');
                reset();
                setPreviewPhoto(null);
            },
            forceFormData: true
        };

        if (view === 'add') {
            post('/users', options);
        } else {
            router.post(
                `/users/${selectedUser.id}`,
                {
                    ...data,
                    _method: 'PUT'
                },
                options
            );
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F4F6FA] font-sans text-gray-900">

            <Head title="Manajemen User" />

            {/* SIDEBAR */}
            <Sidebar />

            {/* MODAL LOGOUT */}
            {showLogout && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
                        <h2 className="text-lg font-bold mb-2">
                            Konfirmasi Logout
                        </h2>

                        <p className="text-sm text-gray-500 mb-5">
                            Kamu yakin mau keluar?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowLogout(false)}
                                className="px-4 py-2 rounded-lg border font-semibold text-sm"
                            >
                                Batal
                            </button>

                            <button
                                onClick={() => router.post('/logout')}
                                className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MAIN CONTENT */}
            <main className="flex-1 lg:ml-64">

                {/* NAVBAR */}
                <div className="flex justify-between items-center px-8 py-6 bg-white border-b sticky top-0 z-40 shadow-sm">

                    <h1 className="text-3xl font-black text-gray-800 tracking-tight">
                        Manajemen User
                    </h1>

                    <div className="flex items-center gap-6">

                        <div className="relative">
                            <Bell
                                size={20}
                                className="cursor-pointer text-gray-400 hover:text-green-600 transition"
                                onClick={() => setShowNotif(!showNotif)}
                            />

                            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </div>

                        <div className="h-6 w-px bg-gray-200"></div>

                        <div className="flex items-center gap-3 cursor-pointer group">
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-800">
                                    {userAuth?.name || "Admin"}
                                </p>

                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                    Administrator
                                </p>
                            </div>

                            <div className="w-10 h-10 rounded-xl bg-green-700 text-white flex items-center justify-center font-bold">
                                {userAuth?.name?.charAt(0) || "A"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="p-8">

                    {/* LIST USER */}
                    {view === 'list' && (
                        <div>

                            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">

                                <div className="flex gap-3 w-full md:w-auto">

                                    {/* SEARCH */}
                                    <div className="relative flex-1 md:w-80">

                                        <Search
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                            size={18}
                                        />

                                        <input
                                            type="text"
                                            placeholder="Cari nama user..."
                                            className="w-full bg-white rounded-2xl pl-12 pr-5 py-3 font-bold shadow-sm focus:ring-2 focus:ring-green-800 border-none"
                                            defaultValue={filters.search}
                                            onChange={handleSearch}
                                        />
                                    </div>

                                    {/* FILTER */}
                                    <select
                                        className="bg-white rounded-2xl px-5 py-3 font-bold shadow-sm focus:ring-2 focus:ring-green-800 border-none"
                                        value={filters.filter || 'latest'}
                                        onChange={(e) =>
                                            router.get(
                                                '/users',
                                                {
                                                    ...filters,
                                                    filter: e.target.value
                                                },
                                                { preserveState: true }
                                            )
                                        }
                                    >
                                        <option value="latest">Terbaru</option>
                                        <option value="oldest">Terlama</option>
                                        <option value="az">A-Z</option>
                                        <option value="za">Z-A</option>
                                    </select>
                                </div>

                                {/* BUTTON */}
                                <button
                                    onClick={() => {
                                        reset();
                                        setPreviewPhoto(null);
                                        setView('add');
                                    }}
                                    className="bg-green-800 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:bg-green-900 transition"
                                >
                                    <Plus size={18} />
                                    Tambah User
                                </button>
                            </div>

                            {/* USER LIST */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">

                                <div className="grid gap-4">

                                    {users.length > 0 ? (
                                        users.map((u) => (

                                            <div
                                                key={u.id}
                                                className="flex items-center justify-between p-5 border rounded-[24px] hover:shadow-md transition-all"
                                            >

                                                <div className="flex items-center gap-5">

                                                    <div className="w-14 h-14 bg-gray-100 rounded-2xl overflow-hidden">
                                                        <img
                                                            src={
                                                                u.photo
                                                                    ? `/storage/${u.photo}`
                                                                    : `https://ui-avatars.com/api/?name=${u.name}`
                                                            }
                                                            className="w-full h-full object-cover"
                                                            alt={u.name}
                                                        />
                                                    </div>

                                                    <div>
                                                        <p className="font-bold text-lg text-gray-800">
                                                            {u.name}
                                                        </p>

                                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                                                            NIP: {u.nip || '---'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2">

                                                    <button
                                                        onClick={() => {
                                                            setSelectedUser(u);
                                                            setView('detail');
                                                        }}
                                                        className="p-3 text-blue-500 hover:bg-blue-50 rounded-xl transition"
                                                    >
                                                        <Eye size={20} />
                                                    </button>

                                                    <button
                                                        onClick={() => openEdit(u)}
                                                        className="p-3 text-amber-500 hover:bg-amber-50 rounded-xl transition"
                                                    >
                                                        <Edit3 size={20} />
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            if (confirm('Hapus user ini?')) {
                                                                router.delete(`/users/${u.id}`);
                                                            }
                                                        }}
                                                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-20">
                                            <SearchX
                                                size={48}
                                                className="mx-auto text-gray-200 mb-4"
                                            />

                                            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
                                                User tidak ditemukan
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}