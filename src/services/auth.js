import axios from "axios";

import { API_BASE_URL } from "../config/ApiConfig";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "An unexpected error occurred.";
  }
};

export const register = async (first_name, last_name, email, password, city_id, baranggay_id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      first_name,
      last_name,
      email,
      password,
      city_id,
      baranggay_id,
    });

    // Return the full response object
    return response;
  } catch (error) {
    // Throw a meaningful error message
    throw error.response?.data?.message || "An unexpected error occurred.";
  }
};