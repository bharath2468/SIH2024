//import api from './apiService'; // Replace with your API URL
import axios from 'axios';
const api = 'http://localhost:5000/api/auth';

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${api}/signup`, data); // Ensure the endpoint matches
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await api.post('/auth/login', data); // Ensure the endpoint matches
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const verifyOtp = async (data) => {
  try {
    const response = await api.post('/auth/verify-otp', data); // Ensure the endpoint matches
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
