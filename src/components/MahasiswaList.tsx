import React from 'react';
import type { Mahasiswa } from '../services/mahasiswaService';

interface MahasiswaListProps {
  mahasiswaList: Mahasiswa[];
  onEdit: (mahasiswa: Mahasiswa) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

const MahasiswaList: React.FC<MahasiswaListProps> = ({
  mahasiswaList,
  onEdit,
  onDelete,
  isLoading = false
}) => {
  const handleDelete = (mahasiswa: Mahasiswa) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data mahasiswa ${mahasiswa.nama} dengan NIM ${mahasiswa.nim}?`)) {
      onDelete(mahasiswa.id!);
    }
  };

  if (isLoading) {
    return <div className="loading">Memuat data mahasiswa...</div>;
  }

  if (mahasiswaList.length === 0) {
    return (
      <div className="empty-state">
        <p>Belum ada data mahasiswa yang terdaftar</p>
      </div>
    );
  }

  return (
    <div className="mahasiswa-list">
      <h3>Daftar Mahasiswa Terdaftar</h3>
      <div className="table-container">
        <table className="mahasiswa-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>NIM</th>
              <th>Nama Lengkap</th>
              <th>Program Studi</th>
              <th>Tanggal Daftar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswaList.map((mahasiswa, index) => (
              <tr key={mahasiswa.id}>
                <td>{index + 1}</td>
                <td>{mahasiswa.nim}</td>
                <td>{mahasiswa.nama}</td>
                <td>{mahasiswa.prodi}</td>
                <td>
                  {mahasiswa.created_at 
                    ? new Date(mahasiswa.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })
                    : '-'
                  }
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => onEdit(mahasiswa)}
                      className="btn-edit"
                      disabled={isLoading}
                      title="Edit data mahasiswa"
                    >
                      📝 Edit
                    </button>
                    <button
                      onClick={() => handleDelete(mahasiswa)}
                      className="btn-delete"
                      disabled={isLoading}
                      title="Hapus data mahasiswa"
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div style={{ 
        padding: '1rem', 
        textAlign: 'center', 
        fontSize: '0.875rem', 
        color: '#718096',
        borderTop: '1px solid #e2e8f0'
      }}>
        Total: {mahasiswaList.length} mahasiswa terdaftar
      </div>
    </div>
  );
};

export default MahasiswaList;
