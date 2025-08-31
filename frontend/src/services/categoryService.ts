import axios from 'axios';
import { Category } from '../types';

const API_URL = 'http://localhost:5000';

export const getCategories = async (): Promise<Category[]> => {
  try {
    console.log('Fetching categories from:', `${API_URL}/categories`);
    const response = await axios.get(`${API_URL}/categories`);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};