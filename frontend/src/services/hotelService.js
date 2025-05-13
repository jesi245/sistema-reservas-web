import axios from 'axios';

const API_URL = 'http://localhost:5000/api/hoteles';

export const buscarHoteles = async (filtros) => {
  try {
    const response = await axios.post(`${API_URL}/buscar`, filtros);
    return response.data;
  } catch (error) {
    console.error('Error al buscar hoteles:', error);
    return [];
  }
};
