import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface User {
  id: string;
  email?: string;
  firstName: string;
  lastName: string;
  role: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const userApiService = {
  // Save user to backend
  async saveUser(userData: Partial<User>) {
    const response = await axios.post(`${API_BASE_URL}/users/save`, userData);
    return response.data;
  },

  // Get user by ID from backend
  async getUserById(id: string) {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
  },

  // Update user in backend
  async updateUser(id: string, updates: Partial<User>) {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, updates);
    return response.data;
  },

  // Get user by phone from backend
  async getUserByPhone(phone: string) {
    const response = await axios.get(`${API_BASE_URL}/users/phone/${phone}`);
    return response.data;
  }
};
