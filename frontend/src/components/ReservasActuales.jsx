import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReservasActuales.css';

const ReservasActuales = () => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/reservas', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReservas(res.data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar las reservas');
      }
    };

    fetchReservas();
  }, []);

  return (
    <div className="reservas-actuales">
      <h2>Reservas Actuales</h2>
      {error && <p className="error">{error}</p>}
      <p>Total: {reservas.length} reservas</p>

      <div className="tarjetas-reservas">
        {reservas.map((reserva, index) => (
          <div className="tarjeta-reserva" key={index}>
            <p><strong>Huésped:</strong> {reserva.nombre}</p>
            <p><strong>Email:</strong> {reserva.email}</p>
            <p><strong>Entrada:</strong> {new Date(reserva.fechaEntrada).toLocaleDateString()}</p>
            <p><strong>Salida:</strong> {new Date(reserva.fechaSalida).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservasActuales;