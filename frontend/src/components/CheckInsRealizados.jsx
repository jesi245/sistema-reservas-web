import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReservasActuales.css'; // Reutilizamos el mismo CSS

const CheckInsRealizados = () => {
  const [checkIns, setCheckIns] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckIns = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/reservas/checkins', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCheckIns(res.data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los check-ins');
      }
    };

    fetchCheckIns();
  }, []);

  return (
    <div className="reservas-actuales">
      <h2>Check-ins Realizados</h2>
      {error && <p className="error">{error}</p>}
      <p>Total: {checkIns.length} check-ins</p>

      <div className="tarjetas-reservas">
        {checkIns.map((reserva, index) => (
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

export default CheckInsRealizados;