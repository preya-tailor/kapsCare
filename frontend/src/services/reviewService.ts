import axios from "axios";
import { Review } from "../types";

const API_URL = "http://localhost:5000";

export const getReviews = async (): Promise<Review[]> => {
  try {
    const res = await axios.get(`${API_URL}/reviews`);
    return res.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
