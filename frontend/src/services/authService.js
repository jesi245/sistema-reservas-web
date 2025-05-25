import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const registrarAdmin = async (datos) => {
  const response = await axios.post(`${API_URL}/registrar`, datos);
  return response.data;
};

export const loginAdmin = async (datos) => {
  const response = await axios.post(`${API_URL}/login`, datos);
  return response.data;
};