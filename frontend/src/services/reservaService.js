import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reservas';

export const realizarReserva = async (reserva) => {
  const response = await axios.post(`${API_URL}/`, reserva);
  return response.data;
};

export const getReservasByEmail = async (email) => {
  const response = await axios.get(`${API_URL}/huesped/${email}`);
  return response.data;
};

export const cancelarReserva = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const checkInReserva = async (id) => {
  const response = await axios.put(`${API_URL}/checkin/${id}`);
  return response.data;
};