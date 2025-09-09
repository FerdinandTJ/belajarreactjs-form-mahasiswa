import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export interface Mahasiswa {
  id?: number;
  nim: string;
  nama: string;
  prodi: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

class MahasiswaService {
  async getAllMahasiswa(): Promise<Mahasiswa[]> {
    try {
      const response = await axios.get<ApiResponse<Mahasiswa[]>>(`${API_BASE_URL}/mahasiswa`);
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching mahasiswa:', error);
      throw error;
    }
  }

  async getMahasiswaById(id: number): Promise<Mahasiswa> {
    try {
      const response = await axios.get<ApiResponse<Mahasiswa>>(`${API_BASE_URL}/mahasiswa/${id}`);
      if (!response.data.data) {
        throw new Error('Mahasiswa not found');
      }
      return response.data.data;
    } catch (error) {
      console.error('Error fetching mahasiswa:', error);
      throw error;
    }
  }

  async createMahasiswa(mahasiswa: Omit<Mahasiswa, 'id'>): Promise<Mahasiswa> {
    try {
      const response = await axios.post<ApiResponse<Mahasiswa>>(`${API_BASE_URL}/mahasiswa`, mahasiswa);
      if (!response.data.data) {
        throw new Error(response.data.message || 'Error creating mahasiswa');
      }
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      console.error('Error creating mahasiswa:', error);
      throw error;
    }
  }

  async updateMahasiswa(id: number, mahasiswa: Omit<Mahasiswa, 'id'>): Promise<Mahasiswa> {
    try {
      const response = await axios.put<ApiResponse<Mahasiswa>>(`${API_BASE_URL}/mahasiswa/${id}`, mahasiswa);
      if (!response.data.data) {
        throw new Error(response.data.message || 'Error updating mahasiswa');
      }
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      console.error('Error updating mahasiswa:', error);
      throw error;
    }
  }

  async deleteMahasiswa(id: number): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/mahasiswa/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      console.error('Error deleting mahasiswa:', error);
      throw error;
    }
  }
}

export const mahasiswaService = new MahasiswaService();
