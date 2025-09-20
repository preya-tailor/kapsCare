import { User } from '../types';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const userService = {
  // Create or update user in database
  async saveUser(userData: Partial<User>): Promise<User> {
    const response = await axios.post(`${API_BASE_URL}/users/save`, userData);
    return response.data.data;
  },

  // Get user by ID
  async getUserById(id: string): Promise<User | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${id}`);
      return response.data.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  // Get user by phone number
  async getUserByPhone(phone: string): Promise<User | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/phone/${encodeURIComponent(phone)}`);
      return response.data.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  // Update user profile
  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/${id}`, updates);
      return response.data.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  // Delete user
  async deleteUser(id: string): Promise<boolean> {
    try {
      await axios.delete(`${API_BASE_URL}/users/${id}`);
      return true;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return false;
      }
      throw error;
    }
  },

  async getAllUsers(): Promise<User[]> {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data.data;
  }
};
