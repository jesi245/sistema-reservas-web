import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reservas';

export const realizarReserva = async (reserva) => {
  const response = await axios.post(`${API_URL}/`, reserva);
  return response.data;
};
