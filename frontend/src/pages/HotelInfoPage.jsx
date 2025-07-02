import React from 'react';
import HotelInfoForm from '../components/HotelInfoForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HotelInfoPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      console.log("📤 Enviando datos al backend:", data); 

      const response = await axios.post('http://localhost:5000/api/hotel-info/crear', data);

      console.log("✅ Respuesta del servidor:", response.data);
      alert('Información del hotel guardada con éxito');
      
      navigate('/api/admin/panel');  // Redirige después de guardar
    } catch (error) {
      console.error("❌ Error al guardar la información del hotel:", error);
      
      if (error.response) {
        console.log("📨 Respuesta del servidor con error:", error.response.data);
        alert(error.response.data.message || 'Error al guardar la información del hotel');
      } else {
        alert('No se pudo conectar al servidor');
      }
    }
  };

  const handleCancelar = () => {
    navigate(-1);
  };

  return (
    <HotelInfoForm onSubmit={handleSubmit} onCancelar={handleCancelar} />
  );
};

export default HotelInfoPage;


