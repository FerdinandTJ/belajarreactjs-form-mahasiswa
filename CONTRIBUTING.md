# Contributing to Sistem Manajemen Data Mahasiswa

Terima kasih atas minat Anda untuk berkontribusi! Berikut adalah panduan untuk berkontribusi pada proyek ini.

## 🚀 Cara Berkontribusi

### 1. Fork Repository
Klik tombol "Fork" di bagian kanan atas halaman repository.

### 2. Clone Repository
```bash
git clone https://github.com/username/cobapertama-ts.git
cd cobapertama-ts
```

### 3. Buat Branch Baru
```bash
git checkout -b feature/nama-fitur-anda
```

Atau untuk bug fix:
```bash
git checkout -b fix/nama-bug-yang-diperbaiki
```

### 4. Setup Development Environment
```bash
# Install dependencies frontend
npm install

# Install dependencies backend
cd backend
npm install
```

### 5. Buat Perubahan
- Pastikan kode mengikuti style guide yang ada
- Tambahkan komentar jika diperlukan
- Test perubahan Anda secara menyeluruh

### 6. Test Perubahan
```bash
# Test frontend
npm run lint
npm run build

# Test backend
cd backend
npm start
```

### 7. Commit Perubahan
```bash
git add .
git commit -m "feat: menambahkan fitur xyz" 
# atau
git commit -m "fix: memperbaiki bug abc"
```

### 8. Push ke Repository Fork
```bash
git push origin feature/nama-fitur-anda
```

### 9. Buat Pull Request
- Buka repository fork Anda di GitHub
- Klik "New Pull Request"
- Isi deskripsi yang jelas tentang perubahan yang dibuat

## 📝 Konvensi Commit

Gunakan format berikut untuk pesan commit:

- `feat:` untuk fitur baru
- `fix:` untuk perbaikan bug
- `docs:` untuk perubahan dokumentasi
- `style:` untuk perubahan formatting/style
- `refactor:` untuk refactoring kode
- `test:` untuk menambah/memperbaiki test
- `chore:` untuk perubahan maintenance

Contoh:
```
feat: menambahkan validasi email pada form mahasiswa
fix: memperbaiki error handling pada API mahasiswa
docs: menambahkan dokumentasi API endpoints
```

## 🔧 Code Style

### Frontend (React/TypeScript)
- Gunakan TypeScript untuk type safety
- Gunakan functional components dengan hooks
- Ikuti konvensi penamaan camelCase
- Gunakan ESLint untuk konsistensi kode

### Backend (Node.js)
- Gunakan ES6+ features
- Gunakan async/await untuk operasi asynchronous
- Gunakan consistent indentation (2 spaces)
- Tambahkan error handling yang proper

## 🐛 Melaporkan Bug

Gunakan GitHub Issues untuk melaporkan bug dengan informasi:

1. **Deskripsi bug**: Penjelasan singkat dan jelas
2. **Steps to reproduce**: Langkah-langkah untuk mereproduksi bug
3. **Expected behavior**: Behavior yang diharapkan
4. **Actual behavior**: Behavior yang terjadi
5. **Screenshots**: Jika applicable
6. **Environment**: OS, browser, Node.js version, dll

## 💡 Mengusulkan Fitur

Untuk mengusulkan fitur baru:

1. Buka GitHub Issues
2. Pilih template "Feature Request"
3. Jelaskan fitur yang diinginkan
4. Jelaskan mengapa fitur ini berguna
5. Berikan mockup/contoh jika memungkinkan

## 📋 Pull Request Guidelines

### Sebelum Submit PR:
- [ ] Code sudah di-test dan berjalan dengan baik
- [ ] Mengikuti code style yang ada
- [ ] Menambahkan dokumentasi jika diperlukan
- [ ] Commit message mengikuti konvensi
- [ ] Branch up-to-date dengan main branch

### Template PR:
```markdown
## Deskripsi
Penjelasan singkat tentang perubahan yang dibuat.

## Jenis Perubahan
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Sudah di-test secara lokal
- [ ] Test cases baru ditambahkan (jika applicable)

## Screenshots
(Jika applicable)

## Checklist
- [ ] Code mengikuti style guidelines
- [ ] Self-review sudah dilakukan
- [ ] Dokumentasi sudah diperbarui
```

## 🤝 Code Review Process

1. Maintainer akan review PR dalam 1-3 hari kerja
2. Diskusi dan feedback akan dilakukan via PR comments
3. Perubahan yang diminta harus dilakukan sebelum merge
4. Setelah approved, PR akan di-merge ke main branch

## 📞 Pertanyaan?

Jika ada pertanyaan, silakan:
- Buka GitHub Issues
- Contact maintainer via email
- Join diskusi di GitHub Discussions

Terima kasih atas kontribusi Anda! 🙏
