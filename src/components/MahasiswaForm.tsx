import React, { useState, useEffect } from 'react';
import type { Mahasiswa } from '../services/mahasiswaService';

interface MahasiswaFormProps {
  onSubmit: (mahasiswa: Omit<Mahasiswa, 'id'>) => Promise<void>;
  initialData?: Mahasiswa;
  isLoading?: boolean;
  onCancel?: () => void;
}

const MahasiswaForm: React.FC<MahasiswaFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
  onCancel
}) => {
  const [formData, setFormData] = useState<Omit<Mahasiswa, 'id'>>({
    nim: '',
    nama: '',
    prodi: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Omit<Mahasiswa, 'id'>, string>>>({});

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        nim: initialData.nim || '',
        nama: initialData.nama || '',
        prodi: initialData.prodi || ''
      });
    } else {
      // Reset form when no initial data (new entry mode)
      setFormData({
        nim: '',
        nama: '',
        prodi: ''
      });
    }
    // Clear errors when switching modes
    setErrors({});
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Omit<Mahasiswa, 'id'>, string>> = {};

    if (!formData.nim.trim()) {
      newErrors.nim = 'NIM harus diisi';
    } else if (formData.nim.length < 5) {
      newErrors.nim = 'NIM minimal 5 karakter';
    }

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama harus diisi';
    } else if (formData.nama.length < 2) {
      newErrors.nama = 'Nama minimal 2 karakter';
    }

    if (!formData.prodi.trim()) {
      newErrors.prodi = 'Program Studi harus diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      if (!initialData) {
        // Reset form only if it's a new entry
        setFormData({ nim: '', nama: '', prodi: '' });
      }
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleInputChange = (field: keyof Omit<Mahasiswa, 'id'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mahasiswa-form">
      <h3>
        {initialData 
          ? `Edit Data Mahasiswa - ${initialData.nama} (${initialData.nim})` 
          : 'Tambah Data Mahasiswa Baru'
        }
      </h3>
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="nim">Nomor Induk Mahasiswa (NIM):</label>
          <input
            type="text"
            id="nim"
            value={formData.nim}
            onChange={(e) => handleInputChange('nim', e.target.value)}
            placeholder="Contoh: 12345678"
            disabled={isLoading}
            className={errors.nim ? 'error' : ''}
          />
          {errors.nim && <span className="error-message">{errors.nim}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="nama">Nama Lengkap:</label>
          <input
            type="text"
            id="nama"
            value={formData.nama}
            onChange={(e) => handleInputChange('nama', e.target.value)}
            placeholder="Contoh: Ahmad Rizki Pratama"
            disabled={isLoading}
            className={errors.nama ? 'error' : ''}
          />
          {errors.nama && <span className="error-message">{errors.nama}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="prodi">Program Studi:</label>
          <select
            id="prodi"
            value={formData.prodi}
            onChange={(e) => handleInputChange('prodi', e.target.value)}
            disabled={isLoading}
            className={errors.prodi ? 'error' : ''}
          >
            <option value="">-- Pilih Program Studi --</option>
            <option value="Teknik Informatika">Teknik Informatika</option>
            <option value="Sistem Informasi">Sistem Informasi</option>
            <option value="Teknik Komputer">Teknik Komputer</option>
            <option value="Manajemen Informatika">Manajemen Informatika</option>
            <option value="Teknik Elektro">Teknik Elektro</option>
            <option value="Teknik Mesin">Teknik Mesin</option>
            <option value="Teknik Sipil">Teknik Sipil</option>
            <option value="Akuntansi">Akuntansi</option>
            <option value="Manajemen">Manajemen</option>
          </select>
          {errors.prodi && <span className="error-message">{errors.prodi}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          disabled={isLoading}
          className="btn-primary"
        >
          {isLoading ? 'Menyimpan Data...' : (initialData ? 'Perbarui Data' : 'Simpan Data')}
        </button>
        
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            disabled={isLoading}
            className="btn-secondary"
          >
            Batalkan
          </button>
        )}
      </div>
    </form>
  );
};

export default MahasiswaForm;
