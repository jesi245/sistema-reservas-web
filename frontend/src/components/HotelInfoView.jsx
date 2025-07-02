// src/components/HotelInfoView.jsx
import React from 'react';
import './PerfilHuesped.css'; // Usamos el mismo estilo que el perfil del huésped

const HotelInfoView = ({ info, onEditar }) => {
  if (!info) return <p>Cargando información del hotel...</p>;

  const renderCampo = (label, valor) => (
    <div className="campo-perfil">
      <label>{label}:</label>
      <span>{valor || '-'}</span>
    </div>
  );

  return (
    <div className="perfil-huesped">
      <h2>Información del Hotel</h2>
      {renderCampo('Nombre del Hotel', info.nombreHotel)}
      {renderCampo('Descripción', info.descripcion)}
      {renderCampo('Ciudad', info.ciudad)}
      {renderCampo('Provincia', info.provincia)}
      {renderCampo('Servicios', info.servicios?.join(', '))}
      {renderCampo('Cantidad de Habitaciones', info.cantidadHabitaciones)}
      {renderCampo('Email de Contacto', info.emailContacto)}

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button className="btn-editar" onClick={onEditar}>
          ✎ Editar Información
        </button>
      </div>
    </div>
  );
};

export default HotelInfoView;

