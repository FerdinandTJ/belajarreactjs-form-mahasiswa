# Sistem Manajemen Data Mahasiswa

Aplikasi web fullstack untuk mengelola data mahasiswa menggunakan React + TypeScript (frontend) dan Node.js + Express (backend) dengan database MySQL.

## 🚀 Fitur

- ✅ Tambah data mahasiswa baru
- ✅ Lihat daftar semua mahasiswa
- ✅ Edit data mahasiswa
- ✅ Hapus data mahasiswa
- ✅ Interface yang responsif dan modern
- ✅ Validasi form
- ✅ RESTful API

## 🛠️ Teknologi yang Digunakan

### Frontend
- **React 19** - Library UI
- **TypeScript** - Type safety
- **Vite** - Build tool dan dev server
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📋 Prasyarat

Pastikan Anda telah menginstall:

- [Node.js](https://nodejs.org/) (v18 atau lebih baru)
- [MySQL](https://www.mysql.com/) (v8.0 atau lebih baru)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)

## 🚀 Instalasi dan Setup

### 1. Clone Repository

```bash
git clone https://github.com/username/cobapertama-ts.git
cd cobapertama-ts
```

### 2. Setup Database

1. Buat database MySQL baru:
```sql
CREATE DATABASE mahasiswa_db;
```

2. Database dan tabel akan dibuat otomatis saat pertama kali menjalankan server backend.

### 3. Setup Backend

```bash
# Masuk ke folder backend
cd backend

# Install dependencies
npm install

# Copy file environment
cp .env.example .env

# Edit file .env sesuai konfigurasi database Anda
# DB_HOST=localhost
# DB_PORT=3306
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=mahasiswa_db
# PORT=3001
```

### 4. Setup Frontend

```bash
# Kembali ke root directory
cd ..

# Install dependencies
npm install
```

## 🔧 Menjalankan Aplikasi

### 1. Jalankan Backend Server

```bash
cd backend
npm run dev
```

Server backend akan berjalan di `http://localhost:3001`

### 2. Jalankan Frontend (Terminal baru)

```bash
# Di root directory
npm run dev
```

Aplikasi frontend akan berjalan di `http://localhost:5173`

## 📁 Struktur Proyek

```
cobapertama-ts/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── MahasiswaForm.tsx    # Form input mahasiswa
│   │   └── MahasiswaList.tsx    # Daftar mahasiswa
│   ├── services/
│   │   └── mahasiswaService.ts  # API service
│   ├── assets/
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── backend/
│   ├── server.js                # Express server
│   ├── database.js              # Database configuration
│   ├── package.json
│   └── .env.example
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🔌 API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/mahasiswa` | Mendapatkan semua data mahasiswa |
| GET | `/api/mahasiswa/:id` | Mendapatkan data mahasiswa berdasarkan ID |
| POST | `/api/mahasiswa` | Menambah data mahasiswa baru |
| PUT | `/api/mahasiswa/:id` | Mengupdate data mahasiswa |
| DELETE | `/api/mahasiswa/:id` | Menghapus data mahasiswa |

### Contoh Request Body (POST/PUT)

```json
{
  "nim": "12345678",
  "nama": "John Doe",
  "prodi": "Teknik Informatika"
}
```

## 🗄️ Schema Database

Tabel `mahasiswa`:

| Field | Type | Description |
|-------|------|-------------|
| id | INT (Primary Key, Auto Increment) | ID unik mahasiswa |
| nim | VARCHAR(20) UNIQUE | Nomor Induk Mahasiswa |
| nama | VARCHAR(100) | Nama lengkap mahasiswa |
| prodi | VARCHAR(100) | Program studi |
| created_at | TIMESTAMP | Waktu data dibuat |
| updated_at | TIMESTAMP | Waktu data diupdate |

## 🚀 Build untuk Production

### Build Frontend

```bash
npm run build
```

File build akan tersedia di folder `dist/`

### Deploy Backend

1. Set environment variables di server production
2. Install dependencies: `npm install --production`
3. Jalankan: `npm start`

## 📝 Scripts yang Tersedia

### Frontend
- `npm run dev` - Menjalankan development server
- `npm run build` - Build untuk production
- `npm run lint` - Menjalankan ESLint
- `npm run preview` - Preview build production

### Backend
- `npm start` - Menjalankan server production
- `npm run dev` - Menjalankan server development dengan nodemon

## 🤝 Contributing

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Nama Anda - [email@example.com](mailto:email@example.com)

Project Link: [https://github.com/username/cobapertama-ts](https://github.com/username/cobapertama-ts)

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

⭐ Jangan lupa berikan star jika proyek ini membantu Anda!
