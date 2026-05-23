<<<<<<< HEAD
import { useState, useEffect } from 'react';
=======
import { useState, useEffect, useRef } from 'react';
>>>>>>> feature-frontend
import Sidebar from '@/Components/Sidebar';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
  Newspaper,
  Bell,
  LogOut,
  Plus,
  Search,
  Trash,
  Pencil,
  Filter,
  ChevronRight,
  Calendar,
} from 'lucide-react';
import Swal from 'sweetalert2';

export default function Berita({ berita = [] }) {
  const { props } = usePage();
  const user = props.auth?.user;

  const [showFilter, setShowFilter] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);

<<<<<<< HEAD
  useEffect(() => {
=======
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

>>>>>>> feature-frontend
    const delay = setTimeout(() => {
      router.get(
        '/berita',
        { search, filter: activeFilter },
        {
          preserveState: true,
          replace: true,
        }
      );
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  const applyFilter = (type) => {
    setActiveFilter(type);

    router.get(
      '/berita',
      { filter: type, search },
      {
        preserveState: true,
        replace: true,
      }
    );

    setShowFilter(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Konfirmasi Hapus',
      text: 'Apakah Anda yakin ingin menghapus berita ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#dc2626',
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/berita/${id}`, {
          preserveScroll: true,
          onSuccess: () => {
            Swal.fire({
              icon: 'success',
              title: 'Berhasil',
              timer: 1500,
              showConfirmButton: false,
            });
          },
        });
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-900">
      <Head title="Manajemen Berita" />

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-64 bg-white min-h-screen">
        {/* NAVBAR */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
          <div className="flex justify-between items-center px-4 lg:px-8 py-4">
            <div className='ml-14 lg:ml-0'>
              <h1 className="text-xl lg:text-2xl font-bold text-slate-800">
                Manajemen Berita
              </h1>

              <p className="hidden sm:block text-xs text-slate-400 mt-0.5 font-medium">
                Kelola informasi resmi
              </p>
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
              <button className="relative p-2 text-slate-400 hover:text-green-600 transition-colors">
                <Bell size={20} />
<<<<<<< HEAD

=======
>>>>>>> feature-frontend
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>

              <div className="h-6 w-px bg-slate-200 mx-1"></div>

              <div className="flex items-center gap-3 pl-1">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-700 leading-none">
                    {user?.name}
                  </p>
<<<<<<< HEAD

=======
>>>>>>> feature-frontend
                  <p className="text-[9px] text-slate-400 uppercase tracking-tighter mt-1">
                    Admin
                  </p>
                </div>

                <div className="w-9 h-9 bg-green-700 text-white flex items-center justify-center rounded-xl font-bold shadow-sm">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 lg:p-8">
          {/* STATS */}
          <div className="bg-green-700 rounded-2xl p-5 lg:p-6 mb-6 text-white shadow-lg relative overflow-hidden group">
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <p className="text-green-100 text-xs lg:text-sm font-medium">
                  Total Berita Dipublikasi
                </p>
<<<<<<< HEAD

=======
>>>>>>> feature-frontend
                <p className="text-2xl lg:text-4xl font-bold mt-1">
                  {berita.length}
                </p>
              </div>

              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <Newspaper size={28} className="text-white" />
              </div>
            </div>
<<<<<<< HEAD

=======
>>>>>>> feature-frontend
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
          </div>

          {/* ACTION */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch gap-4 mb-6">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
<<<<<<< HEAD

=======
>>>>>>> feature-frontend
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari judul berita..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-green-600 focus:ring-0 transition-all outline-none text-sm"
              />
            </div>

            <div className="flex gap-2">
              <Link
                href="/berita/tambah"
                className="flex-1 sm:flex-none bg-green-700 text-white px-5 py-3 rounded-xl hover:bg-green-800 transition-all flex items-center justify-center gap-2 font-semibold shadow-sm text-sm"
              >
                <Plus size={18} />
                Tambah
              </Link>

              <div className="relative">
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className={`h-full px-4 rounded-xl border transition-all ${
                    showFilter
                      ? 'bg-slate-800 border-slate-800 text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Filter size={18} />
                </button>

                {showFilter && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                    <button
                      onClick={() => applyFilter('hari-ini')}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Calendar size={14} />
                      Hari Ini
                    </button>

                    <button
                      onClick={() => applyFilter('semua')}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2"
                    >
                      <ChevronRight size={14} />
                      Semua Berita
                    </button>

                    <button
                      onClick={() => applyFilter('terlama')}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2"
                    >
                      <ChevronRight size={14} />
                      Terlama
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* GRID */}
          {berita.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <Newspaper
                size={48}
                className="mx-auto text-slate-300 mb-3"
              />
<<<<<<< HEAD

=======
>>>>>>> feature-frontend
              <p className="text-slate-500 font-medium">
                Belum ada data berita
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {berita.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group"
                >
                  <div className="relative h-44 bg-slate-100">
                    {item.gambar ? (
                      <img
                        src={`/storage/${item.gambar}`}
                        className="w-full h-full object-cover"
<<<<<<< HEAD
=======
                        alt={item.judul}
>>>>>>> feature-frontend
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <Newspaper size={40} />
                      </div>
                    )}

                    <div className="absolute top-3 left-3">
                      <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase shadow-sm">
                        {item.kategori || 'Info'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-2 font-medium">
                      <Calendar size={12} />
                      {item.created_at}
                    </div>

                    <h3 className="font-bold text-slate-800 text-sm mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
                      {item.judul}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 mb-4 flex-1">
                      {item.isi}
                    </p>

                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-50">
                      <Link
                        href={`/berita/${item.id}/edit`}
                        className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        <Pencil size={16} />
                      </Link>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* MODAL LOGOUT */}
      {showLogout && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut size={28} className="text-red-500" />
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Konfirmasi Logout
              </h3>

              <p className="text-slate-500 mb-6">
                Apakah Anda yakin ingin keluar dari sistem?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => router.post('/logout')}
                  className="flex-1 bg-red-500 text-white py-2.5 rounded-xl hover:bg-red-600 transition-colors font-medium"
                >
                  Ya, Logout
                </button>

                <button
                  onClick={() => setShowLogout(false)}
                  className="flex-1 bg-slate-100 text-slate-600 py-2.5 rounded-xl hover:bg-slate-200 transition-colors font-medium"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}