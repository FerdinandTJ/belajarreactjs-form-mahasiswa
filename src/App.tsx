import { useState, useEffect } from 'react';
import './App.css';
import MahasiswaForm from './components/MahasiswaForm';
import MahasiswaList from './components/MahasiswaList';
import { mahasiswaService, type Mahasiswa } from './services/mahasiswaService';

function App() {
  const [mahasiswaList, setMahasiswaList] = useState<Mahasiswa[]>([]);
  const [editingMahasiswa, setEditingMahasiswa] = useState<Mahasiswa | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isOnline, setIsOnline] = useState(true);

  // Check backend connection
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/health');
        setIsOnline(response.ok);
      } catch {
        setIsOnline(false);
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Load data mahasiswa saat komponen pertama kali dimuat
  useEffect(() => {
    loadMahasiswaData();
  }, []);

  const loadMahasiswaData = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await mahasiswaService.getAllMahasiswa();
      setMahasiswaList(data);
    } catch (error) {
      console.error('Error loading mahasiswa data:', error);
      setError('Terjadi kesalahan saat memuat data. Pastikan server backend sudah berjalan dan database tersambung.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateMahasiswa = async (mahasiswaData: Omit<Mahasiswa, 'id'>) => {
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');
      
      await mahasiswaService.createMahasiswa(mahasiswaData);
      setSuccess('Data mahasiswa berhasil ditambahkan ke sistem!');
      await loadMahasiswaData(); // Reload data
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Gagal menambahkan mahasiswa';
      setError(errorMessage);
      setTimeout(() => setError(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateMahasiswa = async (mahasiswaData: Omit<Mahasiswa, 'id'>) => {
    if (!editingMahasiswa?.id) return;
    
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');
      
      await mahasiswaService.updateMahasiswa(editingMahasiswa.id, mahasiswaData);
      setSuccess('Data mahasiswa berhasil diperbarui!');
      setEditingMahasiswa(null);
      await loadMahasiswaData(); // Reload data
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Gagal mengupdate mahasiswa';
      setError(errorMessage);
      setTimeout(() => setError(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditMahasiswa = (mahasiswa: Mahasiswa) => {
    setEditingMahasiswa(mahasiswa);
    setError('');
    setSuccess('');
    // Scroll to form
    document.querySelector('.form-section')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  const handleCancelEdit = () => {
    setEditingMahasiswa(null);
    setError('');
    setSuccess('');
  };

  const handleDeleteMahasiswa = async (id: number) => {
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');
      
      await mahasiswaService.deleteMahasiswa(id);
      setSuccess('Data mahasiswa berhasil dihapus dari sistem!');
      await loadMahasiswaData(); // Reload data
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Gagal menghapus mahasiswa';
      setError(errorMessage);
      setTimeout(() => setError(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistem Informasi Mahasiswa</h1>
        <p>Platform digital untuk mengelola data mahasiswa dengan teknologi modern Node.js dan React</p>
        
        {/* Connection Status */}
        <div className={`connection-status ${isOnline ? 'online' : 'offline'}`}>
          <span className="status-dot"></span>
          {isOnline ? 'Server Terhubung' : 'Server Terputus'}
        </div>
      </header>

      <main className="App-main">
        {/* Alert Messages */}
        {error && (
          <div className="alert alert-error">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        {success && (
          <div className="alert alert-success">
            <strong>Sukses:</strong> {success}
          </div>
        )}

        {/* Form Section */}
        <section className={`form-section ${editingMahasiswa ? 'edit-mode' : ''}`}>
          <MahasiswaForm
            onSubmit={editingMahasiswa ? handleUpdateMahasiswa : handleCreateMahasiswa}
            initialData={editingMahasiswa || undefined}
            isLoading={isLoading}
            onCancel={editingMahasiswa ? handleCancelEdit : undefined}
          />
        </section>

        {/* List Section */}
        <section className="list-section">
          <MahasiswaList
            mahasiswaList={mahasiswaList}
            onEdit={handleEditMahasiswa}
            onDelete={handleDeleteMahasiswa}
            isLoading={isLoading}
          />
        </section>
      </main>

      <footer className="App-footer">
        <p>
          🚀 Server Backend: {' '}
          <a 
            href="http://localhost:3001/api/health" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            http://localhost:3001
          </a>
          {' '} | 💻 Dibuat dengan Node.js, Express, MySQL & React TypeScript
        </p>
      </footer>
    </div>
  );
}

export default App;
