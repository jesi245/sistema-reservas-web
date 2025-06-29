import axios from 'axios';

export const actualizarPerfilHuesped = async (id, datosActualizados) => {
  const response = await axios.put(`http://localhost:5000/api/huesped/panel/${id}`, datosActualizados);
  return response.data;
};