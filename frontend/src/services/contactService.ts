import axios from 'axios';
import { ContactFormData, ContactResponse } from '../types';

const API_URL = 'http://localhost:5000';

export const sendContactMessage = async (
  formData: ContactFormData
): Promise<ContactResponse> => {
  try {
    console.log('Sending contact message to:', `${API_URL}/contact`);
    const response = await axios.post<ContactResponse>(`${API_URL}/contact`, formData);
    console.log('Contact message saved:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw error;
  }
};