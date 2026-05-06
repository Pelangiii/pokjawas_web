import { useState, useRef } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
  LayoutDashboard,
  Users,
  Newspaper,
  ClipboardCheck,
  Bell,
  LogOut,
  Plus,
  Search,
  Trash,
  Pencil,
  Filter,
  ChevronRight
} from 'lucide-react';
import Swal from 'sweetalert2';

export default function Berita({ berita = [] }) {
  const { props, url } = usePage();
  const user = props.auth?.user;

  const [showFilter, setShowFilter] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const menuClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition font-medium
    ${url.startsWith(path)
      ? "bg-green-100 text-green-700 shadow-sm"
      : "text-gray-500 hover:bg-gray-100"
    }`;

  const applyFilter = (type) => {
    router.get('/admin/berita', { filter: type }, {
      preserveState: true,
      replace: true
    });
    setShowFilter(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Yakin mau di hapus?',
      text: 'Data tidak bisa dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      confirmButtonColor: '#ef4444'
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/admin/berita/${id}`);
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-[#F4F6FA] font-sans text-gray-900">
      <Head title="Manajemen Berita" />

      {/* LOGOUT MODAL */}
      {showLogout && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
          <div className="bg-white p-6 rounded-2xl w-80 shadow-xl">
            <h2 className="font-bold mb-2">Konfirmasi Logout</h2>
            <p className="text-sm text-gray-500 mb-5">Yakin mau keluar?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowLogout(false)} className="px-4 py-2 border rounded-lg">Batal</button>
              <button onClick={() => router.post('/logout')} className="px-4 py-2 bg-red-500 text-white rounded-lg">Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r flex flex-col justify-between p-6 fixed h-full shadow-sm">
        <div>
        <div className="flex items-center gap-3 mb-10">
            <img
                src="/images/pokjawas.png"
                className="w-10 h-10 object-contain"
                alt="Logo"
            />

        <div>
            <h1 className="font-bold text-sm leading-tight">Pokjawas Kemenag</h1>
            <p className="text-[10px] text-gray-400">
            Kabupaten Tangerang
            </p>
        </div>
</div>
          <p className="text-[10px] text-gray-400 mb-4 uppercase font-bold px-2">Menu Utama</p>

          <div onClick={() => router.get('/admin/dashboard')} className={menuClass('/admin/dashboard')}>
            <LayoutDashboard size={18} /> Dashboard
          </div>
          <div onClick={() => router.get('/admin/users')} className={menuClass('/admin/users')}>
            <Users size={18} /> User
          </div>
          <div onClick={() => router.get('/admin/berita')} className={menuClass('/admin/berita')}>
            <Newspaper size={18} /> Berita
          </div>
          <div onClick={() => router.get('/admin/verifikasi')} className={menuClass('/admin/verifikasi')}>
            <ClipboardCheck size={18} /> Verifikasi
          </div>
        </div>

        <button onClick={() => setShowLogout(true)} className="flex items-center gap-2 text-gray-400 hover:text-red-500">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 ml-64">

        {/* NAVBAR */}
        <div className="flex justify-between items-center px-8 py-6 bg-white border-b sticky top-0 shadow-sm">
          <h1 className="text-3xl font-black text-gray-800">Manajemen Berita</h1>

          <div className="flex items-center gap-6">
            <Bell size={20} className="text-gray-400" />

            <div className="h-6 w-px bg-gray-200"></div>

            <div className="flex items-center gap-3 cursor-pointer">
              <div className="text-right">
                <p className="text-sm font-bold">{user?.name}</p>
                <p className="text-[10px] text-gray-400 uppercase">Admin</p>
              </div>
              <div className="w-10 h-10 bg-green-700 text-white flex items-center justify-center rounded-xl font-bold">
                {user?.name?.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8">

          {/* ACTION BAR */}
          <div className="flex justify-between items-center mb-8">
            <div className="relative w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search berita..."
                className="pl-10 pr-4 py-2 w-full rounded-xl border-none shadow-sm focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex gap-2 relative">
              <Link href="/admin/berita/tambah" className="bg-green-700 text-white p-2 rounded-lg hover:bg-green-800">
                <Plus size={18} />
              </Link>

              <button onClick={() => setShowFilter(!showFilter)} className="bg-white border p-2 rounded-lg">
                <Filter size={18} />
              </button>

              {showFilter && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border py-2 z-50">
                  <button onClick={() => applyFilter('hari-ini')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">Hari Ini</button>
                  <button onClick={() => applyFilter('terbaru')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">Terbaru</button>
                  <button onClick={() => applyFilter('terlama')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">Terlama</button>
                </div>
              )}
            </div>
          </div>

          {/* LIST BERITA */}
          {berita.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
              <p className="text-gray-400">Belum ada berita</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {berita.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-3xl shadow-sm border hover:shadow-md transition">
                  <div className="w-full h-40 bg-gray-100 rounded-2xl mb-3 overflow-hidden">
                    {item.gambar && (
                      <img src={`/storage/${item.gambar}`} className="w-full h-full object-cover" />
                    )}
                  </div>

                  <p className="text-xs text-green-600 font-bold uppercase">{item.kategori}</p>
                  <h3 className="font-bold text-sm line-clamp-2">{item.judul}</h3>
                  <p className="text-xs text-gray-400 mb-2">{item.created_at}</p>

                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/berita/${item.id}/edit`} className="text-yellow-500 p-2 hover:bg-yellow-50 rounded-lg">
                      <Pencil size={16} />
                    </Link>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg">
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}