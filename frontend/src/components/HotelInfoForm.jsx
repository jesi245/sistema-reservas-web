import React, { useState, useEffect } from 'react';
import './HotelInfoForm.css';

const HotelInfoForm = ({ infoInicial = null, onSubmit, onCancelar }) => {
  const [formData, setFormData] = useState({
    nombreHotel: '',
    descripcion: '',
    ciudad: '',
    provincia: '',
    servicios: '',
    cantidadHabitaciones: '',
    emailContacto: '',
    logoUrl: ''
  });

  // Cargar datos iniciales si los hay (modo edición)
  useEffect(() => {
    if (infoInicial) {
      setFormData({
        nombreHotel: infoInicial.nombreHotel || '',
        descripcion: infoInicial.descripcion || '',
        ciudad: infoInicial.ciudad || '',
        provincia: infoInicial.provincia || '',
        servicios: infoInicial.servicios ? infoInicial.servicios.join(', ') : '',
        cantidadHabitaciones: infoInicial.cantidadHabitaciones || '',
        emailContacto: infoInicial.emailContacto || '',
        logoUrl: infoInicial.logoUrl || ''
      });
    }
  }, [infoInicial]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      servicios: formData.servicios.split(',').map(s => s.trim()),
      usuarioId: JSON.parse(localStorage.getItem('user'))?._id
    };
    console.log ("Datos enviados desde el formulario:", data)

    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <div className="register-form-container">
      <form className="registro-form" onSubmit={handleSubmit}>
        <h3>Información del Hotel</h3>

        <input type="text" className="box" name="nombreHotel" placeholder="Nombre del Hotel" value={formData.nombreHotel} onChange={handleChange} required />
        <textarea className="box" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} />
        <input type="text" className="box" name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} />
        <input type="text" className="box" name="provincia" placeholder="Provincia" value={formData.provincia} onChange={handleChange} />
        <input type="text" className="box" name="servicios" placeholder="Servicios (separados por coma)" value={formData.servicios} onChange={handleChange} />
        <input type="number" className="box" name="cantidadHabitaciones" placeholder="Cantidad de Habitaciones" value={formData.cantidadHabitaciones} onChange={handleChange} />
        <input type="email" className="box" name="emailContacto" placeholder="Email de contacto" value={formData.emailContacto} onChange={handleChange} />

        <div className="form-buttons">
          <button type="submit" className="btn">Guardar Información</button>
          {onCancelar && (
            <button type="button" className="btn cancelar" onClick={onCancelar}>Cancelar</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default HotelInfoForm;



