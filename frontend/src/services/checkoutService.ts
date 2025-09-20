import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

interface SendOTPRequest {
  email: string;
}

interface VerifyOTPRequest {
  email: string;
  otp: string;
}

interface ProcessOrderRequest {
  email: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
    pinCode: string;
    promoCode?: string;
  };
  cartItems: Array<{
    productId: string;
    product: {
      id: string;
      name: string;
      price: number;
      mainImage: string;
    };
    quantity: number;
  }>;
  totalAmount: number;
}

export const checkoutService = {
  async sendOTP(data: SendOTPRequest) {
    const response = await axios.post(`${API_BASE_URL}/checkout/send-otp`, data);
    return response.data;
  },

  async verifyOTP(data: VerifyOTPRequest) {
    const response = await axios.post(`${API_BASE_URL}/checkout/verify-otp`, data);
    return response.data;
  },

  async processOrder(data: ProcessOrderRequest) {
    const response = await axios.post(`${API_BASE_URL}/checkout/process-order`, data);
    return response.data;
  }
};




