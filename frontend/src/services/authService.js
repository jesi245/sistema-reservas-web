import axios from 'axios';
import API from './api'

const API_URL = 'http://localhost:5000/api/auth';

export const registrarAdmin = async (datos) => {
  const response = await axios.post(`${API_URL}/registrar-admin`, datos);
  return response.data;
};

export const loginAdmin = async (datos) => {
  const response = await API.post(`${API_URL}/login-admin`, datos);
  return response.data;
};

export const registrarHuesped = async (datos) => {
  const response = await axios.post(`${API_URL}/registrar-huesped`, datos);
  return response.data;
};

export const loginHuesped = async (datos) => {
  const response = await axios.post(`${API_URL}/login-huesped`, datos)
  return response.data
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};