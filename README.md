# Pokjawas Web - Sistem Monitoring Kinerja Guru

[![GitHub License](https://img.shields.io/github/license/Pelangiii/pokjawas_web?style=flat-square)](LICENSE)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/Pelangiii/pokjawas_web?style=flat-square)](https://github.com/Pelangiii/pokjawas_web/pulls)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-blue?style=flat-square)](https://nodejs.org)

**Pokjawas Web** adalah platform berbasis web dan dashboard interaktif yang dirancang khusus untuk Kelompok Kerja Pengawas (Pokjawas) Sekolah. Sistem ini berfungsi untuk mempermudah pengawas dalam melakukan monitoring, evaluasi, serta rekapitulasi capaian kinerja guru secara digital, transparan, dan terintegrasi.

---

## 🚀 Fitur Utama

Sistem dikembangkan dengan arsitektur monorepo / pemisahan branch yang jelas untuk fungsionalitas backend dan frontend:

- **Autentikasi & Manajemen Pengguna:** Manajemen hak akses berlapis untuk Admin, Pengawas, dan Guru.
- **Dashboard Pemantauan Real-time:** Grafik dan visualisasi metrik capaian kinerja serta status pengisian instrumen oleh guru.
- **Manajemen Dokumen & Instrumen Evaluasi:** Proses unggah berkas, pengisian form penilaian kinerja, dan validasi dokumen oleh pengawas.
- **Pelaporan & Rekapitulasi Otomatis:** Sistem rekap data performa yang siap dievaluasi kapan saja untuk mendukung pelaporan kerja organisasi.

---

## 🛠️ Arsitektur & Teknologi

Sistem ini dikembangkan menggunakan ekosistem JavaScript modern dengan arsitektur yang modular:

### Frontend (`feature-frontend`)
- **Runtime & Library:** Node.js, React.js (atau Vue.js / framework JS relevan)
- **Styling:** Tailwind CSS / Bootstrap (untuk tampilan dashboard yang responsif dan modern)
- **State Management & Routing:** Navigasi client-side terintegrasi untuk kelancaran dashboard.

### Backend (`feature-backend`)
- **Runtime Environment:** Node.js
- **Framework:** Express.js / Hapi Framework
- **Fitur Backend:** Autentikasi (JWT / Session), Validasi Request, dan integrasi database.

---

## 📂 Struktur Folder Utama

```text
pokjawas_web/
├── config/             # Konfigurasi database & environment variables
├── controllers/        # Logika bisnis dan controller utama backend
├── models/             # Skema database / query data
├── routes/             # Definisi endpoint RESTful API
├── src/ / views/       # Komponen interface (UI) dan layout frontend
├── .env.example        # Contoh template environment variable
└── README.md           # Dokumentasi proyek

 Alur Branching (Git Workflow)
Proyek ini menggunakan strategi percabangan (feature-branching) untuk kolaborasi tim yang rapi:

main / utama : Branch produksi yang berisi kode stabil dan siap pakai.

feature-backend : Branch khusus untuk pengembangan, database, bisnis logik, dan autentikasi.

feature-frontend : Branch khusus untuk implementasi user interface, komponen dashboard, dan integrasi (slicing UI).

Setiap fitur baru wajib melalui proses Pull Request (PR) ke branch main setelah divalidasi oleh kolaborator tim.


💻 Panduan Instalasi Lokal
Ikuti langkah-langkah berikut untuk menjalankan proyek di lingkungan pengembangan lokal Anda:

Prasyarat
Pastikan Anda sudah menginstal Node.js (versi 18 atau ke atas) dan npm / yarn.

Git terinstal di perangkat Anda (khusus pengguna macOS, pastikan konfigurasi permission sudah sesuai).

Langkah-Langkah
Clone Repositori:

Bash
git clone [https://github.com/Pelangiii/pokjawas_web.git](https://github.com/Pelangiii/pokjawas_web.git)
cd pokjawas_web
Pindah ke Branch yang Ingin Dijalankan:

Untuk melihat/menjalankan kode Backend:

Bash
git checkout feature-backend
Untuk melihat/menjalankan kode Frontend:

Bash
git checkout feature-frontend
Instalasi Dependencies:

Bash
npm install
Konfigurasi Environment (.env):
Duplikat file .env.example menjadi .env lalu sesuaikan konfigurasi port, database, atau kredensial API lainnya.

Plaintext
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=password_kamu
JWT_SECRET=rahasia_negara
Jalankan Aplikasi dalam Mode Pengembangan:

Bash
npm run dev
# atau jika menggunakan script start standar:
npm start
👥 Tim Pengembang (Contributors)
Proyek ini dikembangkan dalam rangka tugas kolaborasi tim. Berikut adalah anggota tim yang berkontribusi:

Azwa Khalisa Melantika - azwakm616@gmail.com - Fullstack Developer / Project Manager / Scrumaster

Dhia Nufah - dhianufah08@gmail.com - Fullstack Developer / Technical Writer

Pelangi Pagi - pelangi.pagi7810@gmail.com - Fullstack Developer / System Analyst

Chalila Nurdiana - fichalilanurdiana@gmail.com - Frontend Developer / UI/UX Designer

Hilwa Ilham - hilwaaillham@gmail.com - Frontend Developer / UI/UX Designer

📄 Lisensi
Hak Cipta © 2026 - Dikembangkan oleh Tim Pojokers.
All Rights Reserved.


---

### Tips Penggunaan : 
Jika kelompokmu memakai package manager atau framework spesifik (misal: React Vite, Next.js, Express, atau Hapi), tinggal sesuaikan saja di bagian **🛠️ Arsitektur & Teknologi** dan perintah jalannya di bagian **💻 Panduan Instalasi Lokal** (`npm run dev` atau `node server.js`). 

Tinggal simpan file ini, maka halaman GitHub kamu bakal langsung kelihatan keren dan rapi! Ada bagian yang mau kamu sesuaikan lagi?
