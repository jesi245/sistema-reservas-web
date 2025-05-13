import axios from 'axios';

const API_URL = 'http://localhost:5000/api/hoteles';

// 📤 Función para registrar un hotel
export const registrarHotel = async (datosHotel) => {
  try {
    const response = await axios.post(`${API_URL}/admin`, datosHotel);
    return response.data;
  } catch (error) {
    console.error('Error al registrar hotel:', error);
    throw error;
  }
};
