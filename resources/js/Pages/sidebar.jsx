   <aside className="w-64 bg-white border-r px-6 py-6 flex flex-col justify-between">

        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-green-700 rounded-xl"></div>
            <div>
              <h1 className="text-sm font-semibold leading-tight">
                Pokjawas Kemenag
              </h1>
              <p className="text-xs text-gray-400">Kab. Tangerang</p>
            </div>
          </div>

          <p className="text-gray-400 text-xs mb-4">MENU</p>

          <nav className="space-y-2 text-sm">

            <div className="flex items-center gap-3 bg-green-50 text-green-700 px-4 py-2 rounded-xl font-medium">
              📊 Dashboard
            </div>

            <div className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-xl cursor-pointer">
              👥 Manajemen User
            </div>

            <div className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-xl cursor-pointer">
              📰 Manajemen Berita
            </div>

            <div className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-xl cursor-pointer">
              📄 Verifikasi Laporan
            </div>

          </nav>
        </div>

        {/* LOGOUT */}
        <button
          onClick={() => router.post('/logout')}
          className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition"
        >
          🚪 Logout
        </button>

      </aside>