import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReservasActuales.css'; // usa el mismo estilo que reservas

const HabitacionesDisponibles = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [checkIns, setCheckIns] = useState([]);
  const [habitacionesDisponibles, setHabitacionesDisponibles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Traer todas las habitaciones cargadas por este admin
        const resHabitaciones = await axios.get('http://localhost:5000/api/admin/habitaciones', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Traer todos los check-ins realizados (reservas con checkInRealizado = true)
        const resCheckIns = await axios.get('http://localhost:5000/api/admin/checkins', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setHabitaciones(resHabitaciones.data);
        setCheckIns(resCheckIns.data);

        // Sacar los IDs de las habitaciones ocupadas
        const habitacionesOcupadasIds = resCheckIns.data.map(r => r.hotelId); // hotelId = ID de la habitación

        // Filtrar habitaciones disponibles
        const disponibles = resHabitaciones.data.filter(
          hab => !habitacionesOcupadasIds.includes(hab._id)
        );

        setHabitacionesDisponibles(disponibles);
      } catch (err) {
        console.error('Error al traer habitaciones o check-ins:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="reservas-actuales">
      <h2>Habitaciones Disponibles</h2>
      <p>Total disponibles: {habitacionesDisponibles.length}</p>

      <div className="tarjetas-reservas">
        {habitacionesDisponibles.map((hab, index) => (
          <div key={index} className="tarjeta-reserva">
            <p><strong>Nombre:</strong> {hab.nombre}</p>
            <p><strong>Ciudad:</strong> {hab.ciudad}</p>
            <p><strong>Tipo:</strong> {hab.tipo}</p>
            <p><strong>Precio:</strong> ${hab.precioPorNoche}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitacionesDisponibles;