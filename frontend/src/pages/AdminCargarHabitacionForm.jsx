import React, { useState } from 'react';
import { registrarHotel } from '../services/hotelAdminService';
import './AdminCargarHabitacionForm.css'

const AdminHotelForm = () => {
  const [hotel, setHotel] = useState({
    nombre: '',
    ciudad: '',
    tipo: '',
    descripcion: '',
    servicios: '',
    fotos: '',
    precioPorNoche: '', 
  });

  const handleChange = (e) => {
    setHotel({
      ...hotel,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertir servicios y fotos de string a array
    const dataToSend = {
      ...hotel,
      servicios: hotel.servicios.split(',').map(s => s.trim()),
      fotos: hotel.fotos.split(',').map(f => f.trim()),
    };

    try {
      await registrarHotel(dataToSend);
      alert('Hotel creado correctamente ✅');

      // Limpiar el formulario
      setHotel({
        nombre: '',
        ciudad: '',
        tipo: '',
        descripcion: '',
        servicios: '',
        fotos: '',
        precioPorNoche: '', // Limpiar el campo de precio por noche
      });
    } catch (error) {
      console.error('Error al crear hotel:', error);
      alert('❌ Ocurrió un error al crear el hotel');
    }
  };

  return (
    <div className="formulario-habitacion">
      <h2 className="form-title">Cargar nueva habitación </h2>
      <form id='formHabitacion' onSubmit={handleSubmit}>
        <label for="nombreHotel">Nombre del Hotel</label>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del hotel"
          value={hotel.nombre}
          onChange={handleChange}
          required
        />
        <label for="ciudad">Ciudad</label>
        <input
          type="text"
          name="ciudad"
          placeholder="Ciudad"
          value={hotel.ciudad}
          onChange={handleChange}
          required
        />
        <label for="tipo">Tipo</label>  
        <input
          type="text"
          name="tipo"
          placeholder="Tipo (hotel, hostel...)"
          value={hotel.tipo}
          onChange={handleChange}
          required
        />
        <label for="descripcion">Descripción</label>
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={hotel.descripcion}
          onChange={handleChange}
          required
        />
        <label for="servicios">Servicios (separados por comas)</label>
        <input
          type="text"
          name="servicios"
          placeholder="Servicios (separados por coma)"
          value={hotel.servicios}
          onChange={handleChange}
        />
        <label for="fotos">URLs de Fotos (separadas por comas)</label>
        <input
          type="text"
          name="fotos"
          placeholder="URLs de fotos (separadas por coma)"
          value={hotel.fotos}
          onChange={handleChange}
        />
        {/* Campo de precio por noche */}
        <label for="precio">Precio por Noche (AR)</label>
        <input
          type="number"
          name="precioPorNoche"
          placeholder="Precio por noche"
          value={hotel.precioPorNoche}
          onChange={handleChange}
          required
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default AdminHotelForm;
