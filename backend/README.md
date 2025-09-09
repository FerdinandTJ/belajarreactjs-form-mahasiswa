# Sistem Manajemen Data Mahasiswa - Backend

Backend API untuk sistem manajemen data mahasiswa menggunakan Node.js, Express, dan MySQL.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment file:
```bash
cp .env.example .env
```

3. Edit file `.env` sesuai konfigurasi database Anda

4. Jalankan server:
```bash
npm run dev
```

## API Endpoints

- `GET /api/mahasiswa` - Get all students
- `GET /api/mahasiswa/:id` - Get student by ID
- `POST /api/mahasiswa` - Create new student
- `PUT /api/mahasiswa/:id` - Update student
- `DELETE /api/mahasiswa/:id` - Delete student

## Environment Variables

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=mahasiswa_db
PORT=3001
```
