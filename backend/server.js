import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase, createConnection } from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
let db;
initDatabase().then(connection => {
  db = connection;
}).catch(error => {
  console.error('Failed to initialize database:', error);
  process.exit(1);
});

// Routes

// GET all mahasiswa
app.get('/api/mahasiswa', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM mahasiswa ORDER BY created_at DESC');
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching mahasiswa:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching data'
    });
  }
});

// GET mahasiswa by ID
app.get('/api/mahasiswa/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute('SELECT * FROM mahasiswa WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Mahasiswa not found'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching mahasiswa:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching data'
    });
  }
});

// POST new mahasiswa
app.post('/api/mahasiswa', async (req, res) => {
  try {
    const { nim, nama, prodi } = req.body;
    
    // Validation
    if (!nim || !nama || !prodi) {
      return res.status(400).json({
        success: false,
        message: 'NIM, Nama, dan Prodi harus diisi'
      });
    }
    
    // Check if NIM already exists
    const [existing] = await db.execute('SELECT id FROM mahasiswa WHERE nim = ?', [nim]);
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'NIM sudah terdaftar'
      });
    }
    
    // Insert new mahasiswa
    const [result] = await db.execute(
      'INSERT INTO mahasiswa (nim, nama, prodi) VALUES (?, ?, ?)',
      [nim, nama, prodi]
    );
    
    res.status(201).json({
      success: true,
      message: 'Mahasiswa berhasil ditambahkan',
      data: {
        id: result.insertId,
        nim,
        nama,
        prodi
      }
    });
  } catch (error) {
    console.error('Error creating mahasiswa:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving data'
    });
  }
});

// PUT update mahasiswa
app.put('/api/mahasiswa/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nim, nama, prodi } = req.body;
    
    // Validation
    if (!nim || !nama || !prodi) {
      return res.status(400).json({
        success: false,
        message: 'NIM, Nama, dan Prodi harus diisi'
      });
    }
    
    // Check if mahasiswa exists
    const [existing] = await db.execute('SELECT * FROM mahasiswa WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Mahasiswa not found'
      });
    }
    
    // Check if NIM already exists (excluding current record)
    const [nimCheck] = await db.execute('SELECT id FROM mahasiswa WHERE nim = ? AND id != ?', [nim, id]);
    if (nimCheck.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'NIM sudah terdaftar'
      });
    }
    
    // Update mahasiswa
    await db.execute(
      'UPDATE mahasiswa SET nim = ?, nama = ?, prodi = ? WHERE id = ?',
      [nim, nama, prodi, id]
    );
    
    res.json({
      success: true,
      message: 'Mahasiswa berhasil diupdate',
      data: {
        id: parseInt(id),
        nim,
        nama,
        prodi
      }
    });
  } catch (error) {
    console.error('Error updating mahasiswa:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating data'
    });
  }
});

// DELETE mahasiswa
app.delete('/api/mahasiswa/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if mahasiswa exists
    const [existing] = await db.execute('SELECT * FROM mahasiswa WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Mahasiswa not found'
      });
    }
    
    // Delete mahasiswa
    await db.execute('DELETE FROM mahasiswa WHERE id = ?', [id]);
    
    res.json({
      success: true,
      message: 'Mahasiswa berhasil dihapus'
    });
  } catch (error) {
    console.error('Error deleting mahasiswa:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting data'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}/api`);
});
