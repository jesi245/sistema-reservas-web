import axios from 'axios';

const API_URL = 'http://localhost:5000/api/hoteles';

// 📤 Función para registrar un hotel (habitación)
export const registrarHotel = async (datosHotel) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.post(`${API_URL}/admin`, datosHotel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al registrar hotel:', error);
    throw error;
  }
};

