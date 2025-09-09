# Security Policy

## Supported Versions

Kami mendukung versi berikut dengan update keamanan:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

Jika Anda menemukan kerentanan keamanan, harap laporkan secara bertanggung jawab:

1. **Jangan** buat public issue untuk kerentanan keamanan
2. Kirim email ke: [security@example.com](mailto:security@example.com)
3. Sertakan detail berikut:
   - Deskripsi kerentanan
   - Langkah-langkah untuk mereproduksi
   - Potensi dampak
   - Saran perbaikan (jika ada)

## Response Timeline

- **24 jam**: Konfirmasi penerimaan laporan
- **72 jam**: Initial assessment dan response
- **7 hari**: Update status investigasi
- **30 hari**: Target resolusi (tergantung kompleksitas)

## Security Best Practices

### Untuk Developer:
- Selalu gunakan environment variables untuk data sensitif
- Jangan commit file `.env` ke repository
- Gunakan HTTPS untuk semua komunikasi API
- Validasi semua input dari user
- Gunakan prepared statements untuk query database
- Update dependencies secara regular

### Untuk Deployment:
- Gunakan strong passwords untuk database
- Enable firewall untuk database server
- Gunakan SSL/TLS untuk koneksi database
- Regular backup database
- Monitor logs untuk aktivitas mencurigakan
- Gunakan reverse proxy (nginx/apache) untuk production

## Known Security Considerations

1. **Database Connection**: Pastikan credentials database aman
2. **CORS Configuration**: Review CORS settings untuk production
3. **Input Validation**: Semua input user harus divalidasi
4. **Error Handling**: Jangan expose sensitive info di error messages

## Security Updates

Security updates akan di-announce via:
- GitHub Security Advisories
- Release notes
- README updates

Terima kasih atas bantuan Anda menjaga keamanan proyek ini!
